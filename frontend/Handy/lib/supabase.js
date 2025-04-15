import "react-native-url-polyfill/auto";

export const supabase = {
  storage: {
    from: () => ({
      upload: (path, blob, options) => {
        return fetch(
          `https://ajiufhxmaxxewrbmxovf.supabase.co/storage/v1/object/photos/${path}`,
          {
            method: "POST",
            headers: {
              Authorization:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqaXVmaHhtYXh4ZXdyYm14b3ZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2MjE4ODIsImV4cCI6MjA2MDE5Nzg4Mn0.ZWOvfAVRcxo4jbV0tOBBlV_Y1w1XZujmB8STKwMjT1c",
              "Content-Type": options.contentType,
              "x-upsert": "true",
            },
            body: blob,
          }
        ).then(async (res) => {
          if (!res.ok) {
            const error = await res.text();
            return { error };
          }
          return { data: { path } };
        });
      },
      getPublicUrl: (path) => ({
        data: {
          publicUrl: `https://ajiufhxmaxxewrbmxovf.supabase.co/storage/v1/object/public/photos/${path}`,
        },
      }),
    }),
  },
};
