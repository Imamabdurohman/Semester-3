package doc.html;

import doc.core.Document;
import doc.core.DocumentProcessor;

public class HtmlDocumentProcessor implements DocumentProcessor {

    @Override
    public String getFormatName() {
        return "HTML";
    }

    @Override
    public void process(Document document) {
        System.out.println("🌐 [HtmlDocumentProcessor] Memproses dokumen HTML:");
        System.out.println("<html><body>" + document.getContent() + "</body></html>");
    }
}
