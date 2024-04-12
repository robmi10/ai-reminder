import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server';


export async function POST(req: any) {
    const supabaseUrl = process.env.SECRET_SUPABASE_URL ?? ''
    const supabaseAnonKey = process.env.SECRET_SUPABASE_KEY ?? ''

    const supabase = createClient(supabaseUrl, supabaseAnonKey)


    const blob = await req.formData()
    const audioBlob = blob.get('audioBlob');

    const filePath = `uploads/${Date.now()}-audiofile.wav`;
    const { data, error } = await supabase.storage.from('reminders').upload(filePath, audioBlob, {
        contentType: 'audio/wav',
        cacheControl: '3600',
        upsert: false,
    })

    if (error) {
        console.error(error)
        return NextResponse.json({ error: "Failed to upload audio." }, { status: 400 });
    }

    const res = supabase.storage.from('reminders').getPublicUrl(filePath);
    console.log("check res here ->", res)
    const fileUrl = res.data.publicUrl

    console.log("check fileUrl here ->", fileUrl)
    console.log("check now fileUrl ->", fileUrl)
    return NextResponse.json({ url: fileUrl }, { status: 200 });
}
