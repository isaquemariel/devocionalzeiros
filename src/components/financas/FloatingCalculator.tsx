import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Delete, X } from "lucide-react";

export const FloatingCalculator = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showCalc, setShowCalc] = useState(false);
  const [display, setDisplay] = useState("0");
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const posStart = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPosition({ x: window.innerWidth - 50, y: window.innerHeight - 200 });
      setInitialized(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const clampPosition = useCallback((x: number, y: number) => ({
    x: Math.max(30, Math.min(x, window.innerWidth - 30)),
    y: Math.max(60, Math.min(y, window.innerHeight - 30)),
  }), []);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    hasMoved.current = false;
    dragStart.current = { x: e.clientX, y: e.clientY };
    posStart.current = { ...position };
    e.preventDefault();
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      hasMoved.current = true;
      setPosition(clampPosition(posStart.current.x + (e.clientX - dragStart.current.x), posStart.current.y + (e.clientY - dragStart.current.y)));
    };
    const onUp = () => { isDragging.current = false; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, [clampPosition]);

  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    hasMoved.current = false;
    const t = e.touches[0];
    dragStart.current = { x: t.clientX, y: t.clientY };
    posStart.current = { ...position };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    hasMoved.current = true;
    const t = e.touches[0];
    setPosition(clampPosition(posStart.current.x + (t.clientX - dragStart.current.x), posStart.current.y + (t.clientY - dragStart.current.y)));
  };

  const handleClick = () => {
    if (hasMoved.current) return;
    setShowCalc(prev => !prev);
  };

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const inputDot = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes(".")) setDisplay(display + ".");
  };

  const calculate = (a: number, op: string, b: number): number => {
    switch (op) {
      case "+": return a + b;
      case "-": return a - b;
      case "×": return a * b;
      case "÷": return b !== 0 ? a / b : 0;
      default: return b;
    }
  };

  const handleOperator = (nextOp: string) => {
    const current = parseFloat(display);
    if (prevValue !== null && operator && !waitingForOperand) {
      const result = calculate(prevValue, operator, current);
      setDisplay(String(parseFloat(result.toFixed(10))));
      setPrevValue(result);
    } else {
      setPrevValue(current);
    }
    setOperator(nextOp);
    setWaitingForOperand(true);
  };

  const handleEquals = () => {
    if (prevValue === null || !operator) return;
    const current = parseFloat(display);
    const result = calculate(prevValue, operator, current);
    setDisplay(String(parseFloat(result.toFixed(10))));
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(true);
  };

  const handleClear = () => {
    setDisplay("0");
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const handleBackspace = () => {
    if (waitingForOperand) return;
    setDisplay(display.length > 1 ? display.slice(0, -1) : "0");
  };

  const handlePercent = () => {
    const val = parseFloat(display);
    setDisplay(String(parseFloat((val / 100).toFixed(10))));
  };

  const CalcButton = ({ label, onClick, className = "" }: { label: string; onClick: () => void; className?: string }) => (
    <button
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className={`h-10 rounded-lg text-sm font-semibold active:scale-95 transition-all ${className}`}
    >
      {label}
    </button>
  );

  return (
    <div
      className="fixed z-[35] select-none"
      style={{
        left: position.x,
        top: position.y,
        transform: "translate(-50%, -50%)",
        touchAction: "none",
        cursor: isDragging.current ? "grabbing" : "grab",
        opacity: initialized ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => { isDragging.current = false; }}
      onClick={handleClick}
    >
      {/* FAB Button */}
        <div className="relative">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-lg shadow-emerald-500/30 flex items-center justify-center border-2 border-emerald-400/40">
          <Calculator className="w-5 h-5 text-white" />
        </div>

        {/* Calculator popup */}
        <AnimatePresence>
          {showCalc && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.7, y: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="absolute bottom-full right-0 mb-3 pointer-events-auto"
              style={{ width: 220 }}
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
            >
              <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-3 space-y-2">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Calculadora</span>
                  <button onClick={() => setShowCalc(false)} className="text-white/40 hover:text-white/80 transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Display */}
                <div className="bg-black/40 rounded-xl px-3 py-2 text-right">
                  {operator && prevValue !== null && (
                    <div className="text-[10px] text-white/30">{prevValue} {operator}</div>
                  )}
                  <div className="text-white text-xl font-mono truncate">{display}</div>
                </div>

                {/* Keys */}
                <div className="grid grid-cols-4 gap-1.5">
                  <CalcButton label="C" onClick={handleClear} className="bg-red-500/20 text-red-400 hover:bg-red-500/30" />
                  <CalcButton label="%" onClick={handlePercent} className="bg-white/10 text-white/70 hover:bg-white/20" />
                  <CalcButton label="⌫" onClick={handleBackspace} className="bg-white/10 text-white/70 hover:bg-white/20" />
                  <CalcButton label="÷" onClick={() => handleOperator("÷")} className={`${operator === "÷" && waitingForOperand ? "bg-emerald-500 text-white" : "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"}`} />

                  {["7","8","9"].map(d => <CalcButton key={d} label={d} onClick={() => inputDigit(d)} className="bg-white/5 text-white hover:bg-white/10" />)}
                  <CalcButton label="×" onClick={() => handleOperator("×")} className={`${operator === "×" && waitingForOperand ? "bg-emerald-500 text-white" : "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"}`} />

                  {["4","5","6"].map(d => <CalcButton key={d} label={d} onClick={() => inputDigit(d)} className="bg-white/5 text-white hover:bg-white/10" />)}
                  <CalcButton label="-" onClick={() => handleOperator("-")} className={`${operator === "-" && waitingForOperand ? "bg-emerald-500 text-white" : "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"}`} />

                  {["1","2","3"].map(d => <CalcButton key={d} label={d} onClick={() => inputDigit(d)} className="bg-white/5 text-white hover:bg-white/10" />)}
                  <CalcButton label="+" onClick={() => handleOperator("+")} className={`${operator === "+" && waitingForOperand ? "bg-emerald-500 text-white" : "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"}`} />

                  <CalcButton label="0" onClick={() => inputDigit("0")} className="col-span-2 bg-white/5 text-white hover:bg-white/10" />
                  <CalcButton label="." onClick={inputDot} className="bg-white/5 text-white hover:bg-white/10" />
                  <CalcButton label="=" onClick={handleEquals} className="bg-emerald-500 text-white hover:bg-emerald-600" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
