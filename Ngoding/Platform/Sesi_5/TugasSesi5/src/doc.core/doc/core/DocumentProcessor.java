package doc.core;

public interface DocumentProcessor {
    String getFormatName();

    void process(Document document);
}
