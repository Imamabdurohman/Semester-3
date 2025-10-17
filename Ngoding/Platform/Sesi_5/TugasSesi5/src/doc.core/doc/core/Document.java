package doc.core;

public class Document {
    private final String content;
    private final String format;

    public Document(String content, String format) {
        this.content = content;
        this.format = format;
    }

    public String getContent()
        {
    

        return content;
        
    
    }

    public String getFormat() {
        return format;
    }
}
