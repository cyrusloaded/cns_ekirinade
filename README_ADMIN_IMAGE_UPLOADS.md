# Admin Image Uploads

The visual admin page manager now supports selecting images directly from the user's device.

## What changed

- Image-like fields such as `image`, `photo`, `thumbnail`, `cover`, `banner`, `logo`, `avatar`, and image `src` fields now display a file picker instead of asking the admin to type an image URL.
- Uploaded images are saved into `public/uploads`.
- The CMS stores the generated local path, for example `/uploads/1710000000000-image-id.jpg`, inside the existing page `content` JSON.
- The admin must still click **Save Page** after uploading so the new image path is saved into PostgreSQL.

## New API route

```txt
POST /api/uploads
```

Accepted image types:

```txt
JPG, PNG, WEBP, GIF, SVG
```

Maximum size:

```txt
5MB
```

## Important production note

Saving files into `public/uploads` is fine for local VPS/server deployments. For serverless hosting such as Vercel, use cloud storage like Cloudinary, UploadThing, Supabase Storage, S3, or ImageKit, because serverless file systems are not permanent.
