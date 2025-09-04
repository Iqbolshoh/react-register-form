// API endpoint for saving student data to JSON file
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

export async function POST(request: Request) {
  try {
    const { data } = await request.json();
    
    // Path to public/students.json file
    const filePath = join(process.cwd(), 'public', 'students.json');
    
    // Write data to file
    writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error saving students data:', error);
    return new Response(JSON.stringify({ error: 'Failed to save data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}