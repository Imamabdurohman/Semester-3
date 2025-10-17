package doc.text;

import doc.core.Document;
import doc.core.DocumentProcessor;

public class PlainTextProcessor implements DocumentProcessor {

    @Override
    public String getFormatName() {
        return "Plain Text";
    }

    @Override
    public void process(Document document) {
        System.out.println("📄 [PlainTextProcessor] Memproses dokumen teks biasa:");
        System.out.println(document.getContent());
    }
}
