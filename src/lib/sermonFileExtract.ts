import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth";

// Configure pdf.js worker (vite resolves the URL at build time)
// @ts-ignore
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
export const ACCEPTED_TYPES = ".pdf,.docx,.txt,.md";

export async function extractTextFromFile(file: File): Promise<string> {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("Arquivo muito grande (máx. 10 MB).");
  }
  const name = file.name.toLowerCase();

  if (name.endsWith(".txt") || name.endsWith(".md") || file.type.startsWith("text/")) {
    return (await file.text()).trim();
  }

  if (name.endsWith(".docx")) {
    const buf = await file.arrayBuffer();
    const { value } = await mammoth.extractRawText({ arrayBuffer: buf });
    return (value || "").trim();
  }

  if (name.endsWith(".pdf") || file.type === "application/pdf") {
    const buf = await file.arrayBuffer();
    const doc = await pdfjsLib.getDocument({ data: buf }).promise;
    let out = "";
    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items
        .map((it: any) => ("str" in it ? it.str : ""))
        .join(" ")
        .replace(/\s+/g, " ")
        .trim();
      if (pageText) out += pageText + "\n\n";
    }
    return out.trim();
  }

  throw new Error("Formato não suportado. Envie .pdf, .docx, .txt ou .md.");
}
