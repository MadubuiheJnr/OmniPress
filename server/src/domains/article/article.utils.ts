import { randomBytes } from "node:crypto";
import { generateHTML } from "@tiptap/html";
import sanitizeHtml from "sanitize-html";
import type { JSONContent } from "@tiptap/core";
import { InternalServerError } from "shared/errors/http.error.js";
import StarterKit from "@tiptap/starter-kit";

export const ARTICLE_UTILS = {
  slugify_title: (title: string, existingSlug?: string[]) => {
    let baseSlug = title
      .toLocaleLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();

    let fullSlug = baseSlug;
    let attempt = 1;

    while (existingSlug?.includes(fullSlug) && attempt < 5) {
      const randomHash = randomBytes(5).toString("hex");
      fullSlug = `${baseSlug}-${randomHash}`;
      attempt++;
    }

    if (attempt >= 5)
      throw new InternalServerError(
        "Failed to generate unique slug",
        "Please try again",
      );
    return fullSlug;
  },
  generate_html: (doc: JSONContent) => {
    return generateHTML(doc, [StarterKit]);
  },
  calc_read_time: (json: JSONContent, wpm = 230) => {
    let textContent = "";

    // Recursive function to extract all text from nested nodes
    function extractText(node: JSONContent) {
      if (!node) return;

      if (node.type === "text" && node.text) {
        textContent += node.text + " ";
      } else if (node.content) {
        // Loop through nested content arrays (like blockquotes, lists)
        node.content.forEach(extractText);
      }
    }

    // Start extracting from the root document node
    extractText(json);

    // Split by spaces and filter out empty strings to get the true word count
    const words = textContent.split(/\s+/).filter((word) => word.length > 0);
    const wordCount = words.length;

    // Formula: Reading Time = Total Words / Words Per Minute
    const timeInMinutes = wordCount / wpm;

    // Round up to the nearest whole minute
    return Math.ceil(timeInMinutes).toString();
  },
  sanitize_html: (html: string) => {
    return sanitizeHtml(html, {
      allowedTags: [
        "p",
        "br",
        "strong",
        "em",
        "u",
        "s",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "ul",
        "ol",
        "li",
        "blockquote",
        "pre",
        "code",
        "a",
        "img",
      ],
      allowedAttributes: {
        a: ["href", "target", "rel"],
        img: ["src", "alt"],
        code: ["class"],
      },
    });
  },
};
