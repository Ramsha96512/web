import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import "../birthday.css";
import memory1 from "@/assets/memory1.jpeg";
import memory2 from "@/assets/memory2.jpeg";
import memory3 from "@/assets/memory3.jpeg";
import memory4 from "@/assets/memory4.jpeg";
import memory5 from "@/assets/memory5.jpeg";
import memory6 from "@/assets/memory6.jpeg";
import photo1 from "@/assets/memory1.jpeg";
import photo2 from "@/assets/memory2.jpeg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Birthday, 💌" },
      { name: "description", content: "open the envelope to begin." },
    ],
  }),
  component: Index,
});

function Index() {
  const [section, setSection] = useState("section-envelope");
  const [opening, setOpening] = useState(false);
  const [gone, setGone] = useState(false);
  const [glow, setGlow] = useState(false);
  const [loveCount, setLoveCount] = useState(0);
  const heartsRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const birthdayAudioRef = useRef<HTMLAudioElement>(null);

  const memoryImages = [
    { src: memory1, alt: "Roses & love note" },
    { src: memory2, alt: "Holding hands" },
    { src: memory3, alt: "Heart balloons" },
    { src: memory4, alt: "Candle-lit dinner" },
    { src: memory5, alt: "Under the stars" },
    { src: memory6, alt: "Bouquet & love letter" },
  ];

  const yourPhotos = [
    { src: photo1, caption: "yadd hai ye" },
    { src: photo2, caption: "ketne jhoote the tum" },
  ];

  // Floating hearts
  useEffect(() => {
    const layer = heartsRef.current;
    if (!layer) return;
    const spawn = () => {
      const h = document.createElement("span");
      h.className = "heart";
      h.textContent = Math.random() > 0.5 ? "♥" : "❤";
      const size = 0.9 + Math.random() * 1.6;
      h.style.left = Math.random() * 100 + "vw";
      h.style.fontSize = size + "rem";
      const dur = 6 + Math.random() * 6;
      h.style.animationDuration = dur + "s";
      h.style.color = ["#e63956","#ff7aa8","#ff9ec0","#cdb4db"][Math.floor(Math.random()*4)];
      layer.appendChild(h);
      setTimeout(() => h.remove(), dur * 1000 + 200);
    };
    const id = window.setInterval(spawn, 450);
    return () => window.clearInterval(id);
  }, []);

  const burst = (n: number) => {
    const layer = heartsRef.current;
    if (!layer) return;
    for (let i = 0; i < n; i++) {
      setTimeout(() => {
        const h = document.createElement("span");
        h.className = "heart";
        h.textContent = "♥";
        h.style.left = Math.random() * 100 + "vw";
        h.style.fontSize = (1 + Math.random() * 1.5) + "rem";
        const dur = 5 + Math.random() * 4;
        h.style.animationDuration = dur + "s";
        h.style.color = ["#e63956","#ff7aa8","#ff9ec0"][Math.floor(Math.random()*3)];
        layer.appendChild(h);
        setTimeout(() => h.remove(), dur * 1000 + 200);
      }, i * 60);
    }
  };

  const goTo = (id: string) => {
    setSection(id);
    if (id === "section-cake") {
      setTimeout(() => setGlow(true), 1200);
      setTimeout(() => {
        setSection("section-final");
        burst(60);
        if (birthdayAudioRef.current) {
          birthdayAudioRef.current.volume = 0.6;
          birthdayAudioRef.current.play().catch(() => {});
        }
      }, 5500);
    }
  };

  const openEnvelope = () => {
    if (opening) return;
    setOpening(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.45;
      audioRef.current.play().catch(() => {});
    }
    setTimeout(() => setGone(true), 1100);
    setTimeout(() => goTo("section-welcome"), 1500);
  };

  const cls = (id: string) => "section" + (section === id ? " active" : "");

  const downloadLoveNote = () => {
    const text =
`My dearest,

Some people walk into your life and quietly rearrange the colors of everything. You did that for me.

You make ordinary mornings feel like something worth waking up for. Your laugh is my favorite song, and your kindness is the safest place I know.

On your birthday, I wish you skies full of soft light, hands always warm, and a heart that always feels as loved as it makes others feel.

Thank you for being you. Today, tomorrow, always.

— Yours, forever ♡
`;
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "love-note.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <div className="bd-root">
      <div className="hearts" ref={heartsRef} />

      <section className={cls("section-envelope")} id="section-envelope">
        <div className="envelope-wrap">
          <p className="hint">A little something for you… tap to open 💌</p>
          <div
            className={"envelope" + (opening ? " opening" : "") + (gone ? " gone" : "")}
            role="button" tabIndex={0}
            onClick={openEnvelope}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openEnvelope(); } }}
            aria-label="Open envelope"
          >
            <div className="env-back" />
            <div className="env-letter"><span>For You ♡</span></div>
            <div className="env-front" />
            <div className="env-flap" />
            <div className="env-heart">♥</div>
          </div>
        </div>
      </section>

      <section className={cls("section-welcome")} id="section-welcome">
        <div className="card">
          <h1 className="script-xl">heeeeeeeehhhhhhhhheeeeee</h1>
          <p className="lead">haaaaaaapppppyyyy Bbbbirrrthhhdddaayyyyy</p>
          <button className="btn" onClick={() => goTo("section-memories")}>Take me through it →</button>
        </div>
      </section>

      <section className={cls("section-memories")} id="section-memories">
        <h2 className="script-lg">dekhhooo</h2>
        <div className="memories-carousel">
          <Carousel
            opts={{ loop: true, align: "center" }}
            plugins={[Autoplay({ delay: 2200, stopOnInteraction: false, stopOnMouseEnter: true })]}
            className="w-full"
          >
            <CarouselContent>
              {memoryImages.map((m, i) => (
                <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                  <figure className="memory">
                    <img src={m.src} alt={m.alt} loading="lazy" width={1024} height={1024} />
                  </figure>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <button className="btn" onClick={() => goTo("section-photos")}>Next →</button>
      </section>

      <section className={cls("section-photos")} id="section-photos">
        <h2 className="script-lg">Just for you</h2>
        <div className="photos-carousel">
          <Carousel
            opts={{ loop: true, align: "center" }}
            plugins={[Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })]}
            className="w-full"
          >
            <CarouselContent>
              {yourPhotos.map((p, i) => (
                <CarouselItem key={i}>
                  <figure className="photo-slide">
                    <figcaption className="photo-caption-top">{p.caption}</figcaption>
                    <img src={p.src} alt={p.caption} loading="lazy" />
                  </figure>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <button className="btn" onClick={() => goTo("section-fun")}>A little surprise →</button>
      </section>

      <section className={cls("section-fun")} id="section-fun">
        <div className="card">
          <h2 className="script-lg">Send me your love 💕</h2>
          <p className="lead">Tap the heart as many times as you love me ..click matt karte rahh jana …</p>
          <button
            className="big-heart"
            aria-label="Send love"
            onClick={() => { setLoveCount(c => c + 1); burst(6); }}
          >
            ♥
          </button>
          <p className="counter">{loveCount} {loveCount === 1 ? "heart" : "hearts"} sent</p>
          <button className="btn" onClick={() => goTo("section-cake")}>Now blow the candles ..aache se fuk marna 🎂</button>
        </div>
      </section>

      <section className={cls("section-cake") + (glow ? " glow" : "")} id="section-cake">
        <h2 className="script-lg">Make a wish…</h2>
        <div className="cake">
          <div className="candle c1"><div className="flame" /></div>
          <div className="candle c2"><div className="flame" /></div>
          <div className="candle c3"><div className="flame" /></div>
          <div className="layer top" />
          <div className="layer middle" />
          <div className="layer bottom" />
          <div className="plate" />
        </div>
        <p className="hint">close your eyes…</p>
      </section>

      <section className={cls("section-final")} id="section-final">
        <div className="final">
          <h1 className="script-xxl">Happy Birthday</h1>
          <p className="script-lg"> ♡</p>
          <p className="lead">Here's to you — and to every year I get to love you a little more ....ye ai ka text hai mere nahi.hhehe</p>
        </div>
      </section>

      <audio ref={audioRef} loop preload="auto">
        <source src="https://cdn.pixabay.com/download/audio/2022/10/30/audio_347111d654.mp3?filename=romantic-piano-12873.mp3" type="audio/mpeg" />
      </audio>
      <audio ref={birthdayAudioRef} preload="auto">
        <source src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=happy-birthday-254480.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}
