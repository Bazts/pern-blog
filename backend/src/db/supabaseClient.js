import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bwqyfofdsqnzbxicalsn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3cXlmb2Zkc3FuemJ4aWNhbHNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc4Njk4OTksImV4cCI6MjAyMzQ0NTg5OX0.0Gd_6cDFLWe9l_HL4o9ITZ9MgwtJYumoAvk_UbMw-7I'
export const supabase = createClient(supabaseUrl, supabaseKey)
