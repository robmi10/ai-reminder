import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server';
import formidable from 'formidable';

const supabaseUrl = process.env.SUPABASE_URL ?? ''
const supabaseAnonKey = process.env.SUPABASE_KEY ?? ''
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const config = {
    api: {
        bodyParser: false, // Disables the default Next.js body parser
    },
};

export async function POST(req: any) {
    // const body = await req.json();
    // const formData = await req.formData();
    // const selectedaudioBlob = formData.get('audioBlob');

    const form = new formidable.IncomingForm();


    const blob = await req.formData()
    console.log("formData req blob body->", blob)

    // console.log("body ->", body)
    // console.log("selectedaudioBlob now ->", selectedaudioBlob)
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
