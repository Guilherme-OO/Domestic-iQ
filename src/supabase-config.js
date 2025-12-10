import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://dqukdcntjwgretusoags.supabase.co'
const SUPABASE_KEY = 'ab_publ1aHMe_cphd-3i_n1l5fRjTlkfgA_rGMREb'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
