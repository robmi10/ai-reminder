import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.SUPABASE_URL ?? ''
const supabaseAnonKey = process.env.SUPABASE_KEY ?? ''

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase URL and Anon Key must be provided.");
}
const supabase = createClient(supabaseUrl, supabaseAnonKey)


export async function POST(req: any) {
    const blob = await req.formData()
    console.log("formData req blob body->", blob)
    let audioBlob = ''

    const filePath = `uploads/${Date.now()}-audiofile.wav`;
    const { data, error } = await supabase.storage.from('reminders').upload(filePath, audioBlob)

    if (error) {
        console.error(error)
        return NextResponse.json({ error: "Failed to upload audio." }, { status: 400 });
    }

    console.log("data ->", data)
    const fileUrl = `${supabase.storage.getBucket('reminders')}/${filePath}`
    console.log("check now fileUrl ->", fileUrl)
    return NextResponse.json({ url: fileUrl }, { status: 200 });

}
