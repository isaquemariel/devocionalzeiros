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
  Menu,
  X,
  AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { AppHeader } from "@/components/shared/AppHeader";
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

// Typing indicator component
const TypingIndicator = () => (
  <div className="flex gap-1 items-center px-2">
    <motion.div
      className="w-2 h-2 rounded-full bg-cyan-500"
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
    />
    <motion.div
      className="w-2 h-2 rounded-full bg-cyan-500"
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
    />
    <motion.div
      className="w-2 h-2 rounded-full bg-cyan-500"
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
    />
  </div>
);

const DevocionalzeiroChat = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load conversations
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

  // Load messages for a conversation
  const loadMessages = useCallback(async (conversationId: string) => {
    try {
      const { data, error } = await supabase
        .from("chat_messages")
        .select("*")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      setMessages(data?.map(m => ({ 
        id: m.id, 
        role: m.role as "user" | "assistant", 
        content: m.content 
      })) || []);
    } catch (error) {
      console.error("Error loading messages:", error);
      toast.error("Erro ao carregar mensagens");
    }
  }, []);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      loadConversations();
    }
  }, [user, loadConversations]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Create new conversation
  const createConversation = async (firstMessage: string): Promise<string | null> => {
    if (!user) return null;

    try {
      // Generate title from first message (first 50 chars)
      const title = firstMessage.length > 50 
        ? firstMessage.substring(0, 50) + "..." 
        : firstMessage;

      const { data, error } = await supabase
        .from("chat_conversations")
        .insert({
          user_id: user.id,
          title,
        })
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

  // Save message to database
  const saveMessage = async (conversationId: string, role: "user" | "assistant", content: string) => {
    try {
      const { error } = await supabase
        .from("chat_messages")
        .insert({
          conversation_id: conversationId,
          role,
          content,
        });

      if (error) throw error;

      // Update conversation updated_at
      await supabase
        .from("chat_conversations")
        .update({ updated_at: new Date().toISOString() })
        .eq("id", conversationId);

    } catch (error) {
      console.error("Error saving message:", error);
    }
  };

  // Prompt delete confirmation
  const promptDeleteConversation = (conversationId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setConversationToDelete(conversationId);
    setDeleteDialogOpen(true);
  };

  // Delete conversation
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

  // Delete all conversations
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

  // Select conversation
  const selectConversation = async (conversation: Conversation) => {
    setCurrentConversationId(conversation.id);
    await loadMessages(conversation.id);
    setShowSidebar(false);
  };

  // Start new chat
  const startNewChat = () => {
    setCurrentConversationId(null);
    setMessages([]);
    setShowSidebar(false);
  };

  const streamChat = async (userMessage: string) => {
    const userMsg: Message = { role: "user", content: userMessage };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);
    setInput("");

    let conversationId = currentConversationId;

    // Create conversation if new
    if (!conversationId) {
      conversationId = await createConversation(userMessage);
      if (!conversationId) {
        setIsLoading(false);
        return;
      }
      setCurrentConversationId(conversationId);
    }

    // Save user message
    await saveMessage(conversationId, "user", userMessage);

    let assistantContent = "";

    try {
      // Get current session for auth token
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
        if (response.status === 401) {
          toast.error("Sessão expirada. Faça login novamente.");
          navigate("/auth");
        } else if (response.status === 429) {
          toast.error("Limite de requisições excedido. Aguarde alguns minutos.");
        } else if (response.status === 402) {
          toast.error("Créditos insuficientes para usar o chat.");
        } else {
          toast.error(errorData.error || "Erro ao enviar mensagem");
        }
        setIsLoading(false);
        return;
      }

      if (!response.body) {
        throw new Error("No response body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";

      // Add empty assistant message
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

      // Save assistant message
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
    <div className="min-h-screen bg-background flex overflow-x-hidden">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      </div>

      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-72 flex-col border-r border-border/50 bg-background/80 backdrop-blur-sm relative z-10">
        <div className="p-4 border-b border-border/50">
          <Button
            onClick={startNewChat}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
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
              <p className="text-sm text-muted-foreground text-center py-8">
                Nenhuma conversa ainda
              </p>
            ) : (
              conversations.map((conversation) => (
                <motion.div
                  key={conversation.id}
                  className={`group flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-colors ${
                    currentConversationId === conversation.id
                      ? "bg-primary/10 border border-primary/30"
                      : "hover:bg-muted/10"
                  }`}
                  onClick={() => selectConversation(conversation)}
                  whileHover={{ x: 2 }}
                >
                  <MessageCircle className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="flex-1 text-sm truncate">{conversation.title}</span>
                  <button
                    onClick={(e) => promptDeleteConversation(conversation.id, e)}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-destructive/20 rounded transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-destructive" />
                  </button>
                </motion.div>
              ))
            )}
          </div>
        </ScrollArea>
        
        {/* Delete All Button */}
        {conversations.length > 0 && (
          <div className="p-3 border-t border-border/50">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDeleteAllDialogOpen(true)}
              className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Apagar todas as conversas
            </Button>
          </div>
        )}
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {showSidebar && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSidebar(false)}
            />
            <motion.aside
              className="fixed left-0 top-0 bottom-0 w-72 flex flex-col bg-background z-50 md:hidden"
              initial={{ x: -288 }}
              animate={{ x: 0 }}
              exit={{ x: -288 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="p-4 border-b border-border/50 flex items-center justify-between">
                <span className="font-semibold">Conversas</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowSidebar(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <div className="p-4">
                <Button
                  onClick={startNewChat}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Conversa
                </Button>
              </div>
              <ScrollArea className="flex-1 p-2">
                <div className="space-y-1">
                  {conversations.map((conversation) => (
                    <motion.div
                      key={conversation.id}
                      className={`group flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-colors ${
                        currentConversationId === conversation.id
                          ? "bg-primary/10 border border-primary/30"
                          : "hover:bg-muted/10"
                      }`}
                      onClick={() => selectConversation(conversation)}
                    >
                      <MessageCircle className="w-4 h-4 text-muted-foreground shrink-0" />
                      <span className="flex-1 text-sm truncate">{conversation.title}</span>
                      <button
                        onClick={(e) => promptDeleteConversation(conversation.id, e)}
                        className="p-1 hover:bg-destructive/20 rounded"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-destructive" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
              
              {/* Delete All Button - Mobile */}
              {conversations.length > 0 && (
                <div className="p-3 border-t border-border/50">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setDeleteAllDialogOpen(true)}
                    className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative z-10 min-w-0">
        {/* Header */}
        <motion.header
          className="border-b border-border/50 bg-background/80 backdrop-blur-sm"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSidebar(true)}
              className="md:hidden shrink-0"
            >
              <Menu className="w-5 h-5" />
            </Button>
            <AppHeader 
              userId={user?.id}
              showLogo={false}
            />
          </div>
        </motion.header>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-2 sm:px-4">
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            {messages.length === 0 ? (
              <motion.div
                className="flex flex-col items-center justify-center h-full py-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center mb-6">
                  <MessageCircle className="w-10 h-10 text-cyan-500" />
                </div>
                <h2 className="text-xl font-bold mb-2">Olá! Sou o Devocionalzeiro.CHAT</h2>
                <p className="text-muted-foreground text-center max-w-md mb-8">
                  Estou aqui para ajudar com suas dúvidas bíblicas e teológicas. 
                  Pergunte sobre versículos, doutrinas, aplicações práticas e muito mais!
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                  {suggestedQuestions.map((question, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleSuggestedQuestion(question)}
                      className="p-3 rounded-xl bg-card/50 border border-border/50 hover:bg-card/80 hover:border-primary/30 transition-all text-left text-sm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary shrink-0" />
                        <span>{question}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <div className="space-y-4 pb-4">
                <AnimatePresence mode="popLayout">
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id || index}
                      className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      {message.role === "assistant" && (
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shrink-0">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] p-4 rounded-2xl ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-card/80 border border-border/50"
                        }`}
                      >
                        <div className="text-sm whitespace-pre-wrap leading-relaxed">
                          {message.content || (
                            <div className="flex items-center gap-2 py-1">
                              <TypingIndicator />
                              <span className="text-muted-foreground text-xs">Escrevendo...</span>
                            </div>
                          )}
                        </div>
                      </div>
                      {message.role === "user" && (
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
                          <User className="w-4 h-4 text-primary-foreground" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 border-t border-border/50 bg-background/80 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Faça sua pergunta bíblica..."
                disabled={isLoading}
                className="flex-1 bg-card/50 border-border/50"
              />
              <Button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </Button>
            </form>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Respostas baseadas em comentários bíblicos e teologia cristã
            </p>
          </div>
        </div>
      </div>

      {/* Delete Single Conversation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              Excluir conversa?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. A conversa e todas as mensagens serão permanentemente excluídas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteConversation}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete All Conversations Dialog */}
      <AlertDialog open={deleteAllDialogOpen} onOpenChange={setDeleteAllDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              Excluir todas as conversas?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Todas as {conversations.length} conversas e suas mensagens serão permanentemente excluídas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deletingAll}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={deleteAllConversations}
              disabled={deletingAll}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deletingAll ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Excluindo...
                </span>
              ) : (
                "Excluir tudo"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DevocionalzeiroChat;
