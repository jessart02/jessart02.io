import { useState, useRef } from "react";


function Label({ children }) {
  return (
    <label className="block text-sm font-semibold text-gray-300 mb-2">
      {children}
    </label>
  );
}

function Input(props) {
  return (
    <input
      className="
        w-full px-4 py-3 rounded-lg
        border border-white/20
        bg-black/60 text-white placeholder-gray-400
        transition-all duration-300
        focus:border-primary
        focus:bg-black/80
        focus:ring-2 focus:ring-primary/50
        focus:shadow-[0_0_15px_rgba(242,13,242,0.6)]
        outline-none
        disabled:opacity-60
      "
      {...props}
    />
  );
}

function TextArea(props) {
  return (
    <textarea
      className="
        w-full px-4 py-3 rounded-lg
        border border-white/20
        bg-black/60 text-white placeholder-gray-400
        resize-none
        transition-all duration-300
        focus:border-primary
        focus:bg-black/80
        focus:ring-2 focus:ring-primary/50
        focus:shadow-[0_0_15px_rgba(242,13,242,0.6)]
        outline-none
        disabled:opacity-60
      "
      {...props}
    />
  );
}


export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const subjectRef = useRef(null);
  const messageRef = useRef(null);

  const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbyZZufxDB7R-fhA6G31wuLI6981eAgtTOnjZ6MHWjANzx3-Gc79-8BQ7xeCYBZdhTKlTQ/exec";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    const nombre = nameRef.current.value;
    const email = emailRef.current.value;
    const asunto = subjectRef.current.value;
    const mensaje = messageRef.current.value;

    if (!nombre || !email || !mensaje) {
      setMessage({
        text: "❌ Por favor completa todos los campos obligatorios.",
        type: "error",
      });
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage({
        text: "❌ Ingresa un correo electrónico válido.",
        type: "error",
      });
      setLoading(false);
      return;
    }

    try {
      const params = new URLSearchParams({
        nombre,
        email,
        asunto: asunto || `Mensaje de ${nombre}`,
        mensaje,
      });

      await fetch(`${SCRIPT_URL}?${params.toString()}`);

      setMessage({
        text: "✅ ¡Mensaje enviado correctamente!",
        type: "success",
      });

      nameRef.current.value = "";
      emailRef.current.value = "";
      subjectRef.current.value = "";
      messageRef.current.value = "";
    } catch (error) {
      setMessage({
        text: "✅ ¡Mensaje enviado!",
        type: "success",
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <main className="min-h-screen w-full text-white">
      <section className="mt-24 max-w-2xl mx-auto px-6">
        <form
          onSubmit={handleSubmit}
          className="
            space-y-6 p-10 rounded-2xl
            bg-black/70 backdrop-blur-xl
            border border-white/10
            shadow-2xl
          "
        >
          <fieldset
            disabled={loading}
            className={`space-y-6 transition-opacity ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            <div>
              <Label>Nombre *</Label>
              <Input placeholder="Tu nombre" ref={nameRef} />
            </div>

            <div>
              <Label>Email *</Label>
              <Input type="email" placeholder="tu@email.com" ref={emailRef} />
            </div>

            <div>
              <Label>Asunto (opcional)</Label>
              <Input placeholder="Asunto del mensaje" ref={subjectRef} />
            </div>

            <div>
              <Label>Mensaje *</Label>
              <TextArea
                rows={6}
                placeholder="Escribe tu mensaje aquí..."
                ref={messageRef}
              />
            </div>

            {message.text && (
              <div
                className={`p-4 rounded-lg text-sm ${
                  message.type === "success"
                    ? "bg-green-500/20 text-green-300 border border-green-400/30"
                    : "bg-red-500/20 text-red-300 border border-red-400/30"
                }`}
              >
                {message.text}
              </div>
            )}
          </fieldset>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition-all ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-primary hover:scale-105 shadow-neon"
            }`}
          >
            {loading ? "Enviando..." : "Enviar mensaje"}
          </button>
        </form>
      </section>
    </main>
  );
}
