import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Trash2, Settings2 } from 'lucide-react';
import { CustomCategory } from '@/hooks/useFinanceCategories';

interface CategorySelectProps {
  value: string;
  onChange: (v: string) => void;
  allCategories: string[];
  customCategories: CustomCategory[];
  onAddCategory: (name: string) => Promise<boolean>;
  onRemoveCategory: (id: string) => Promise<void>;
}

export function CategorySelect({
  value, onChange, allCategories, customCategories, onAddCategory, onRemoveCategory
}: CategorySelectProps) {
  const [manageOpen, setManageOpen] = useState(false);
  const [newCat, setNewCat] = useState('');
  const [adding, setAdding] = useState(false);

  const handleAdd = async () => {
    if (!newCat.trim()) return;
    setAdding(true);
    const ok = await onAddCategory(newCat);
    if (ok) setNewCat('');
    setAdding(false);
  };

  return (
    <div className="space-y-1.5">
      <div className="flex gap-2">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm truncate"
        >
          {allCategories.map(c => (
            <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
          ))}
        </select>
        <Button type="button" variant="outline" size="icon" className="shrink-0 h-10 w-10" onClick={() => setManageOpen(true)} title="Gerenciar categorias">
          <Settings2 className="w-4 h-4" />
        </Button>
      </div>

      <Dialog open={manageOpen} onOpenChange={setManageOpen}>
        <DialogContent className="sm:max-w-sm max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg">Gerenciar Categorias</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Nova categoria..."
                value={newCat}
                onChange={(e) => setNewCat(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                className="flex-1"
              />
              <Button size="sm" onClick={handleAdd} disabled={adding} className="shrink-0">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium">Padrão</p>
              <div className="flex flex-wrap gap-1.5">
                {allCategories.filter(c => !customCategories.find(cc => cc.name === c)).map(c => (
                  <span key={c} className="px-2 py-1 rounded-md bg-muted text-xs text-muted-foreground capitalize">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {customCategories.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-medium">Personalizadas</p>
                <div className="space-y-1">
                  {customCategories.map(cc => (
                    <div key={cc.id} className="flex items-center justify-between px-2 py-1.5 rounded-md bg-muted/50">
                      <span className="text-sm capitalize">{cc.name}</span>
                      <button onClick={() => onRemoveCategory(cc.id)} className="text-muted-foreground hover:text-destructive transition-colors p-1">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
