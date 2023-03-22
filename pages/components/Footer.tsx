const Footer = () => {
    return (
        <footer className="flex items-center justify-center border-neutral-800 w-full h-16">
        <a
          className="flex items-center justify-center bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-md text-sm font-medium"
          href="https://openai.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/OpenAI_Logo.svg" alt="Vercel Logo" className="h-4 ml-2 invert" />
        </a>
      </footer>
    );
};

export default Footer;