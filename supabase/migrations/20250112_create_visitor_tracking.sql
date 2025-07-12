-- Create visitor tracking tables
CREATE TABLE IF NOT EXISTS visitor_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id TEXT NOT NULL UNIQUE,
    ip_address INET,
    user_agent TEXT,
    country TEXT,
    city TEXT,
    device_type TEXT,
    browser TEXT,
    os TEXT,
    referrer TEXT,
    landing_page TEXT,
    is_returning_visitor BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS page_visits (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id TEXT NOT NULL,
    page_url TEXT NOT NULL,
    page_title TEXT,
    visit_duration INTEGER, -- in seconds
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    FOREIGN KEY (session_id) REFERENCES visitor_sessions(session_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS visitor_stats (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    total_visitors INTEGER DEFAULT 0,
    unique_visitors INTEGER DEFAULT 0,
    returning_visitors INTEGER DEFAULT 0,
    page_views INTEGER DEFAULT 0,
    bounce_rate DECIMAL(5,2) DEFAULT 0,
    avg_session_duration INTEGER DEFAULT 0, -- in seconds
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(date)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_visitor_sessions_session_id ON visitor_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_visitor_sessions_created_at ON visitor_sessions(created_at);
CREATE INDEX IF NOT EXISTS idx_page_visits_session_id ON page_visits(session_id);
CREATE INDEX IF NOT EXISTS idx_page_visits_created_at ON page_visits(created_at);
CREATE INDEX IF NOT EXISTS idx_visitor_stats_date ON visitor_stats(date);

-- Enable RLS
ALTER TABLE visitor_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE visitor_stats ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (allow all operations for service role, read for authenticated users)
CREATE POLICY "Allow service role full access to visitor_sessions" ON visitor_sessions
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow authenticated users to read visitor_sessions" ON visitor_sessions
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow service role full access to page_visits" ON page_visits
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow authenticated users to read page_visits" ON page_visits
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow service role full access to visitor_stats" ON visitor_stats
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow authenticated users to read visitor_stats" ON visitor_stats
    FOR SELECT USING (auth.role() = 'authenticated');

-- Create function to update visitor stats
CREATE OR REPLACE FUNCTION update_visitor_stats()
RETURNS TRIGGER AS $$
BEGIN
    -- Update daily visitor stats
    INSERT INTO visitor_stats (date, total_visitors, unique_visitors, returning_visitors, page_views)
    VALUES (
        CURRENT_DATE,
        1,
        CASE WHEN NEW.is_returning_visitor THEN 0 ELSE 1 END,
        CASE WHEN NEW.is_returning_visitor THEN 1 ELSE 0 END,
        0
    )
    ON CONFLICT (date) DO UPDATE SET
        total_visitors = visitor_stats.total_visitors + 1,
        unique_visitors = visitor_stats.unique_visitors + CASE WHEN NEW.is_returning_visitor THEN 0 ELSE 1 END,
        returning_visitors = visitor_stats.returning_visitors + CASE WHEN NEW.is_returning_visitor THEN 1 ELSE 0 END,
        updated_at = NOW();
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update stats when new visitor session is created
CREATE TRIGGER trigger_update_visitor_stats
    AFTER INSERT ON visitor_sessions
    FOR EACH ROW
    EXECUTE FUNCTION update_visitor_stats();

-- Create function to update page view stats
CREATE OR REPLACE FUNCTION update_page_view_stats()
RETURNS TRIGGER AS $$
BEGIN
    -- Update daily page view stats
    UPDATE visitor_stats 
    SET page_views = page_views + 1,
        updated_at = NOW()
    WHERE date = CURRENT_DATE;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update page view stats
CREATE TRIGGER trigger_update_page_view_stats
    AFTER INSERT ON page_visits
    FOR EACH ROW
    EXECUTE FUNCTION update_page_view_stats(); 