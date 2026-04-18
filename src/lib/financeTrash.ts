import { supabase } from '@/integrations/supabase/client';

export type TrashEntity =
  | 'transaction'
  | 'subscription'
  | 'installment'
  | 'fixed_cost'
  | 'recurring'
  | 'project'
  | 'budget';

const TABLE_MAP: Record<TrashEntity, string> = {
  transaction: 'financial_transactions',
  subscription: 'financial_subscriptions',
  installment: 'financial_installments',
  fixed_cost: 'financial_fixed_costs',
  recurring: 'financial_recurring',
  project: 'financial_projects',
  budget: 'financial_budgets',
};

export const ENTITY_LABEL: Record<TrashEntity, string> = {
  transaction: 'Transação',
  subscription: 'Assinatura',
  installment: 'Parcelado',
  fixed_cost: 'Custo Fixo',
  recurring: 'Recorrente',
  project: 'Projeto',
  budget: 'Orçamento',
};

export function getTableName(entity: TrashEntity): string {
  return TABLE_MAP[entity];
}

/**
 * Soft-delete: copia o registro para a lixeira e remove da tabela original.
 * Mantém saldo coerente porque o registro é removido das fontes de cálculo.
 */
export async function moveToTrash(
  userId: string,
  entity: TrashEntity,
  record: { id: string } & Record<string, any>
): Promise<{ error: any }> {
  const table = getTableName(entity);

  // 1. Salva snapshot na lixeira
  const { error: trashError } = await supabase.from('financial_trash' as any).insert({
    user_id: userId,
    entity_type: entity,
    original_id: record.id,
    data: record,
  });
  if (trashError) return { error: trashError };

  // 2. Remove da tabela original
  const { error: deleteError } = await supabase.from(table as any).delete().eq('id', record.id);
  if (deleteError) {
    // Rollback: tenta remover da lixeira se falhou ao deletar
    await supabase.from('financial_trash' as any).delete().eq('original_id', record.id).eq('entity_type', entity);
    return { error: deleteError };
  }

  return { error: null };
}

/**
 * Restaura um item da lixeira para a tabela original.
 */
export async function restoreFromTrash(trashId: string, entity: TrashEntity, data: any): Promise<{ error: any; restored?: any }> {
  const table = getTableName(entity);

  // Remove campos não-inseríveis problemáticos
  const cleanData = { ...data };
  // Mantemos o id original para preservar referências históricas

  const { data: restored, error: insertError } = await supabase
    .from(table as any)
    .insert(cleanData)
    .select()
    .single();

  if (insertError) return { error: insertError };

  // Remove da lixeira
  await supabase.from('financial_trash' as any).delete().eq('id', trashId);

  return { error: null, restored };
}

/**
 * Exclui permanentemente um item da lixeira.
 */
export async function purgeFromTrash(trashId: string): Promise<{ error: any }> {
  const { error } = await supabase.from('financial_trash' as any).delete().eq('id', trashId);
  return { error };
}
