import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  Bot,
  User, 
  Loader2,
  Sparkles,
  MessageCircle,
  Plus,
  Trash2,
  X,
  AlertTriangle,
  ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/hooks/useAuth";
import { useUserPlan } from "@/hooks/useUserPlan";
import { useUsageLimits } from "@/hooks/useUsageLimits";
import { UsageLimitModal } from "@/components/shared/UsageLimitModal";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Message = {
  id?: string;
  role: "user" | "assistant";
  content: string;
};

type Conversation = {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
};

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/devocionalzeiro-chat`;

const suggestedQuestions = [
  "O que significa 'graça' na Bíblia?",
  "Explique João 3:16",
  "Qual a diferença entre fé e obras?",
  "Como aplicar Filipenses 4:13 hoje?",
];

const TypingIndicator = () => (
  <div className="flex gap-1 items-center px-1">
    {[0, 0.2, 0.4].map((delay, i) => (
      <motion.div
        key={i}
        className="w-2 h-2 rounded-full bg-primary"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, delay }}
      />
    ))}
  </div>
);

const DevocionalzeiroChat = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { planType } = useUserPlan(user?.email || undefined);
  const { checkLimit, incrementUsage } = useUsageLimits(user?.id, planType);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [conversationToDelete, setConversationToDelete] = useState<string | null>(null);
  const [deleteAllDialogOpen, setDeleteAllDialogOpen] = useState(false);
  const [deletingAll, setDeletingAll] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [usageLimitModal, setUsageLimitModal] = useState<{ isOpen: boolean; featureName: string; currentUsage: number; limit: number; isBlocked: boolean } | null>(null);

  const loadConversations = useCallback(async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from("chat_conversations")
        .select("*")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false });
      if (error) throw error;
      setConversations(data || []);
    } catch (error) {
      console.error("Error loading conversations:", error);
    } finally {
      setLoadingConversations(false);
    }
  }, [user]);

  const loadMessages = useCallback(async (conversationId: string) => {
    try {
      const { data, error } = await supabase
        .from("chat_messages")
        .select("*")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });
      if (error) throw error;
      setMessages(data?.map(m => ({ id: m.id, role: m.role as "user" | "assistant", content: m.content })) || []);
    } catch (error) {
      console.error("Error loading messages:", error);
      toast.error("Erro ao carregar mensagens");
    }
  }, []);

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) loadConversations();
  }, [user, loadConversations]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const createConversation = async (firstMessage: string): Promise<string | null> => {
    if (!user) return null;
    try {
      const title = firstMessage.length > 50 ? firstMessage.substring(0, 50) + "..." : firstMessage;
      const { data, error } = await supabase
        .from("chat_conversations")
        .insert({ user_id: user.id, title })
        .select()
        .single();
      if (error) throw error;
      setConversations(prev => [data, ...prev]);
      return data.id;
    } catch (error) {
      console.error("Error creating conversation:", error);
      toast.error("Erro ao criar conversa");
      return null;
    }
  };

  const saveMessage = async (conversationId: string, role: "user" | "assistant", content: string) => {
    try {
      const { error } = await supabase
        .from("chat_messages")
        .insert({ conversation_id: conversationId, role, content });
      if (error) throw error;
      await supabase
        .from("chat_conversations")
        .update({ updated_at: new Date().toISOString() })
        .eq("id", conversationId);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  };

  const promptDeleteConversation = (conversationId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setConversationToDelete(conversationId);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteConversation = async () => {
    if (!conversationToDelete) return;
    try {
      const { error } = await supabase
        .from("chat_conversations")
        .delete()
        .eq("id", conversationToDelete);
      if (error) throw error;
      setConversations(prev => prev.filter(c => c.id !== conversationToDelete));
      if (currentConversationId === conversationToDelete) {
        setCurrentConversationId(null);
        setMessages([]);
      }
      toast.success("Conversa excluída");
    } catch (error) {
      console.error("Error deleting conversation:", error);
      toast.error("Erro ao excluir conversa");
    } finally {
      setDeleteDialogOpen(false);
      setConversationToDelete(null);
    }
  };

  const deleteAllConversations = async () => {
    if (!user) return;
    setDeletingAll(true);
    try {
      const { error } = await supabase
        .from("chat_conversations")
        .delete()
        .eq("user_id", user.id);
      if (error) throw error;
      setConversations([]);
      setCurrentConversationId(null);
      setMessages([]);
      toast.success("Todas as conversas foram excluídas");
    } catch (error) {
      console.error("Error deleting all conversations:", error);
      toast.error("Erro ao excluir conversas");
    } finally {
      setDeletingAll(false);
      setDeleteAllDialogOpen(false);
    }
  };

  const selectConversation = async (conversation: Conversation) => {
    setCurrentConversationId(conversation.id);
    await loadMessages(conversation.id);
    setShowSidebar(false);
  };

  const startNewChat = () => {
    setCurrentConversationId(null);
    setMessages([]);
    setShowSidebar(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const streamChat = async (userMessage: string) => {
    const chatLimit = checkLimit("chat_question");
    if (!chatLimit.canUse) {
      setUsageLimitModal({
        isOpen: true,
        featureName: "Pergunta ao Chat",
        currentUsage: chatLimit.currentUsage,
        limit: chatLimit.limit,
        isBlocked: chatLimit.isBlocked,
      });
      return;
    }
    await incrementUsage("chat_question");

    const userMsg: Message = { role: "user", content: userMessage };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);
    setInput("");

    let conversationId = currentConversationId;
    if (!conversationId) {
      conversationId = await createConversation(userMessage);
      if (!conversationId) { setIsLoading(false); return; }
      setCurrentConversationId(conversationId);
    }

    await saveMessage(conversationId, "user", userMessage);
    let assistantContent = "";

    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session?.access_token) {
        toast.error("Sessão expirada. Faça login novamente.");
        navigate("/auth");
        setIsLoading(false);
        return;
      }

      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 401) { toast.error("Sessão expirada. Faça login novamente."); navigate("/auth"); }
        else if (response.status === 429) { toast.error("Limite de requisições excedido. Aguarde alguns minutos."); }
        else if (response.status === 402) { toast.error("Créditos insuficientes para usar o chat."); }
        else { toast.error(errorData.error || "Erro ao enviar mensagem"); }
        setIsLoading(false);
        return;
      }

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });
        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: "assistant", content: assistantContent };
                return updated;
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      if (assistantContent && conversationId) {
        await saveMessage(conversationId, "assistant", assistantContent);
      }
    } catch (error) {
      console.error("Chat error:", error);
      toast.error("Erro ao conectar com o chat");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    streamChat(input.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!input.trim() || isLoading) return;
      streamChat(input.trim());
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    if (isLoading) return;
    streamChat(question);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
      </div>

      {/* ── Desktop Sidebar ── */}
      <aside className="hidden md:flex w-72 shrink-0 flex-col border-r border-border/50 bg-background/80 backdrop-blur-sm relative z-10">
        <div className="p-4 border-b border-border/50">
          <Button
            onClick={startNewChat}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 h-11"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova Conversa
          </Button>
        </div>
        <ScrollArea className="flex-1 p-2">
          <div className="space-y-1">
            {loadingConversations ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
              </div>
            ) : conversations.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">Nenhuma conversa ainda</p>
            ) : (
              conversations.map((conversation) => (
                <motion.div
                  key={conversation.id}
                  className={`group flex items-center gap-2 p-3 rounded-xl cursor-pointer transition-colors ${
                    currentConversationId === conversation.id
                      ? "bg-primary/10 border border-primary/30"
                      : "hover:bg-muted/40"
                  }`}
                  onClick={() => selectConversation(conversation)}
                  whileHover={{ x: 2 }}
                >
                  <MessageCircle className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="flex-1 text-sm truncate">{conversation.title}</span>
                  <button
                    onClick={(e) => promptDeleteConversation(conversation.id, e)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-destructive/20 rounded-lg transition-all"
                    aria-label="Excluir conversa"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-destructive" />
                  </button>
                </motion.div>
              ))
            )}
          </div>
        </ScrollArea>
        {conversations.length > 0 && (
          <div className="p-3 border-t border-border/50">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDeleteAllDialogOpen(true)}
              className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Apagar todas
            </Button>
          </div>
        )}
      </aside>

      {/* ── Mobile Sidebar Overlay ── */}
      <AnimatePresence>
        {showSidebar && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSidebar(false)}
            />
            <motion.aside
              className="fixed left-0 top-0 bottom-0 w-[85vw] max-w-xs flex flex-col bg-background z-50 md:hidden shadow-2xl"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
            >
              {/* Sidebar Header */}
              <div className="flex items-center justify-between px-4 py-4 border-b border-border/50 pt-safe">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-semibold text-base">Conversas</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setShowSidebar(false)} className="h-9 w-9">
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* New Chat Button */}
              <div className="px-4 py-3">
                <Button
                  onClick={startNewChat}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 h-12 text-base"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Nova Conversa
                </Button>
              </div>

              <ScrollArea className="flex-1 px-3">
                <div className="space-y-1 pb-4">
                  {loadingConversations ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                    </div>
                  ) : conversations.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">Nenhuma conversa ainda</p>
                  ) : (
                    conversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        className={`flex items-center gap-3 p-3.5 rounded-xl cursor-pointer transition-colors active:scale-[0.98] ${
                          currentConversationId === conversation.id
                            ? "bg-primary/10 border border-primary/30"
                            : "hover:bg-muted/40"
                        }`}
                        onClick={() => selectConversation(conversation)}
                      >
                        <MessageCircle className="w-4 h-4 text-muted-foreground shrink-0" />
                        <span className="flex-1 text-sm truncate">{conversation.title}</span>
                        <button
                          onClick={(e) => promptDeleteConversation(conversation.id, e)}
                          className="p-2 hover:bg-destructive/20 rounded-lg transition-all shrink-0"
                          aria-label="Excluir conversa"
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>

              {conversations.length > 0 && (
                <div className="p-4 border-t border-border/50 pb-safe">
                  <Button
                    variant="ghost"
                    onClick={() => setDeleteAllDialogOpen(true)}
                    className="w-full text-destructive hover:text-destructive hover:bg-destructive/10 h-11"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Apagar todas as conversas
                  </Button>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col relative z-10 min-w-0 h-full">

        {/* Header */}
        <motion.header
          className="shrink-0 border-b border-border/50 bg-background/90 backdrop-blur-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="max-w-3xl mx-auto px-2 sm:px-4 h-14 flex items-center pt-safe mt-2">
            {/* Esquerda: botão voltar */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/home")}
              className="h-10 w-10 shrink-0"
              aria-label="Voltar"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Centro: vazio para manter a seta à esquerda balanceada */}
            <div className="flex-1" />

            {/* Direita: botão Conversas */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSidebar(true)}
              className="md:hidden h-10 gap-1.5 px-3 shrink-0 text-sm font-medium"
              aria-label="Histórico de conversas"
            >
              <MessageCircle className="w-5 h-5" />
              Conversas
            </Button>
            {/* Desktop: espaçador para balancear o centro */}
            <div className="hidden md:block w-10 shrink-0" />
          </div>
        </motion.header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto overscroll-contain" ref={scrollContainerRef}>
          <div className="max-w-3xl mx-auto px-3 sm:px-4 py-4 pb-2">
            {messages.length === 0 ? (
              <motion.div
                className="flex flex-col items-center justify-center min-h-[50vh] py-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center mb-5">
                  <MessageCircle className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold mb-2">Olá! Sou o Devocionalzeiro.CHAT</h2>
                <p className="text-muted-foreground text-sm sm:text-base max-w-sm mb-7">
                  Estou aqui para ajudar com suas dúvidas bíblicas e teológicas.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-md">
                  {suggestedQuestions.map((question, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleSuggestedQuestion(question)}
                      className="p-3.5 rounded-xl bg-card/60 border border-border/60 hover:bg-card hover:border-primary/40 active:scale-[0.97] transition-all text-left text-sm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08 * index }}
                    >
                      <div className="flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span className="leading-snug">{question}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <div className="space-y-5">
                <AnimatePresence mode="popLayout">
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id || index}
                      className={`flex gap-2.5 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      {message.role === "assistant" && (
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <div
                        className={`max-w-[85%] sm:max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground rounded-br-md"
                            : "bg-card border border-border/50 rounded-bl-md"
                        }`}
                      >
                        {message.content || (
                          <div className="flex items-center gap-2 py-0.5">
                            <TypingIndicator />
                            <span className="text-muted-foreground text-xs">Escrevendo...</span>
                          </div>
                        )}
                      </div>
                      {message.role === "user" && (
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0 mt-0.5">
                          <User className="w-4 h-4 text-primary-foreground" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </div>

        {/* ── Fixed Input Area ── */}
        <div className="shrink-0 border-t border-border/50 bg-background/95 backdrop-blur-md px-3 sm:px-4 pt-3 pb-24">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="flex items-end gap-2 bg-card/60 border border-border/60 rounded-2xl px-3 py-2.5 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20 transition-all">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  e.target.style.height = "auto";
                  e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
                }}
                onKeyDown={handleKeyDown}
                placeholder="Faça sua pergunta bíblica..."
                disabled={isLoading}
                rows={1}
                className="flex-1 bg-transparent border-none outline-none resize-none text-sm placeholder:text-muted-foreground/60 min-h-[24px] max-h-[120px] py-0.5 leading-relaxed disabled:opacity-50"
                style={{ height: "auto" }}
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isLoading}
                className="h-9 w-9 shrink-0 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:opacity-40"
                aria-label="Enviar mensagem"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground/60 text-center mt-2">
              Enter para enviar · Shift+Enter para nova linha
            </p>
          </form>
        </div>
      </div>

      {/* Delete Single Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="mx-4 max-w-sm rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-base">
              <AlertTriangle className="w-5 h-5 text-destructive shrink-0" />
              Excluir conversa?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm">
              Esta ação não pode ser desfeita. A conversa e todas as mensagens serão excluídas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:gap-0">
            <AlertDialogCancel className="h-11">Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteConversation}
              className="h-11 bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete All Dialog */}
      <AlertDialog open={deleteAllDialogOpen} onOpenChange={setDeleteAllDialogOpen}>
        <AlertDialogContent className="mx-4 max-w-sm rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-base">
              <AlertTriangle className="w-5 h-5 text-destructive shrink-0" />
              Excluir todas as conversas?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm">
              Todas as {conversations.length} conversas e suas mensagens serão permanentemente excluídas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:gap-0">
            <AlertDialogCancel disabled={deletingAll} className="h-11">Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={deleteAllConversations}
              disabled={deletingAll}
              className="h-11 bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deletingAll ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Excluindo...
                </span>
              ) : "Excluir tudo"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {usageLimitModal && (
        <UsageLimitModal
          isOpen={usageLimitModal.isOpen}
          onClose={() => setUsageLimitModal(null)}
          featureName={usageLimitModal.featureName}
          currentUsage={usageLimitModal.currentUsage}
          limit={usageLimitModal.limit}
          isBlocked={usageLimitModal.isBlocked}
          planType={planType || "free"}
        />
      )}
    </div>
  );
};

export default DevocionalzeiroChat;
