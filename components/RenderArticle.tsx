import { type JSONContent } from "novel";
import React, { useMemo } from "react";
import { generateHTML } from "@tiptap/html";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import Code from "@tiptap/extension-code";
import Quote from "@tiptap/extension-blockquote";
import TextStyle from "@tiptap/extension-text-style";
import CodeBlock from "@tiptap/extension-code-block";
import OrderedList from "@tiptap/extension-ordered-list";

const RenderArticle = ({ jsonData }: { jsonData: JSONContent }) => {
  const output = useMemo(() => {
    return generateHTML(jsonData, [
      Document,
      Paragraph,
      Text,
      Link,
      Underline,
      Heading,
      ListItem,
      BulletList,
      Code,
      CodeBlock,
      Quote,
      TextStyle,
      OrderedList,
    ]);
  }, [jsonData]);

  return (
    <div
      className="prose m-auto w-11/12 prose-blockquote:bg-muted prose-blockquote:rounded-md prose-blockquote:px-3 prose-blockquote:py-2 prose-li:marker:text-emerald-600  sm:prose-lg dark:prose-invert sm:w-2/3 "
      dangerouslySetInnerHTML={{ __html: output }}
    />
  );
};

export default RenderArticle;
