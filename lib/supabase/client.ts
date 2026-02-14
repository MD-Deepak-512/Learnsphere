import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function saveSession(topic: string, modality: string, depth: string) {
    try {
        const { data, error } = await supabase
            .from('learning_sessions')
            .insert([{ topic, modality, depth }])
            .select();
        if (error) console.warn('Session save skipped:', error.message);
        return data;
    } catch {
        console.warn('Supabase not configured for sessions');
        return null;
    }
}

export async function getRecentSessions(limit = 10) {
    try {
        const { data, error } = await supabase
            .from('learning_sessions')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(limit);
        if (error) return [];
        return data || [];
    } catch {
        return [];
    }
}
