export async function onRequestGet(ctx) {
  // Get the filename from the URL path
  const path = new URL(ctx.request.url).pathname.replace("/download/", "");
  
  // Fetch the file from R2
  const file = await ctx.env.APP.get(path);
  
  // Return 404 if not found
  if (!file) return new Response("File not found", { status: 404 });
  
  // Set appropriate headers for APK files
  const headers = new Headers();
  
  // Add file metadata
  file.writeHttpMetadata(headers);
  
  // Set specific headers for APK files
  if (path.endsWith('.apk')) {
    headers.set('Content-Type', 'application/vnd.android.package-archive');
    headers.set('Content-Disposition', `attachment; filename=${path}`);
  }
  
  // Return the file with headers
  return new Response(file.body, { headers });
}