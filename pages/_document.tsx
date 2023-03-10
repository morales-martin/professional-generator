import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* <title>Create Next App</title> */}
        <meta
          name="description"
          content="Generate a professional version of a message!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="bg-primary-color">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
