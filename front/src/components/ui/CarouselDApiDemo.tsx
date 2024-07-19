import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useGetTracks } from "@/hooks/spotifyApi";
import { TrackType } from "@/interfaces/spotifyApi";
import AudioMotionAnalyzer from "audiomotion-analyzer";

export function CarouselDApiDemo() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [tracks, setTracks] = React.useState<TrackType[]>([]);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [guess, setGuess] = React.useState({ title: "", artist: "" });
  const [scores, setScores] = React.useState<Array<number | null>>([]);
  const [submittedIndices, setSubmittedIndices] = React.useState<Set<number>>(
    new Set()
  );
  const [started, setStarted] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(true);
  const [audioTimer, setAudioTimer] = React.useState<number | null>(null);
  const [countdown, setCountdown] = React.useState<number | null>(null);
  const audioRefs = React.useRef<Array<HTMLAudioElement | null>>([]);
  const visualizerRefs = React.useRef<Array<AudioMotionAnalyzer | null>>([]);

  const { data, error, isLoading } = useGetTracks();

  React.useEffect(() => {
    if (data) {
      setTracks(data);
      setCount(data.length);
      setScores(new Array(data.length).fill(null));
    }
  }, [data]);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrentSlide(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrentSlide(api.selectedScrollSnap());
      audioRefs.current.forEach((audio) => {
        if (audio) {
          audio.pause();
        }
      });
      if (started && currentSlide >= 0 && audioRefs.current[currentSlide]) {
        startAudio(currentSlide);
      }
    });
  }, [api, started, currentSlide]);

  const startAudio = (index: number) => {
    audioRefs.current.forEach((audio, i) => {
      if (audio) {
        if (i !== index) {
          audio.pause();
          audio.currentTime = 0;
        }
      }
    });

    setTimeout(() => {
      if (audioRefs.current[index]) {
        audioRefs.current[index].currentTime = 0;
        audioRefs.current[index].play().catch((error) => {
          console.error("Failed to play audio:", error);
        });

        startVisualizer(index);
      }
    }, 500);
  };

  const startVisualizer = (index: number) => {
    const audio = audioRefs.current[index];
    if (audio) {
      const containerId = `visualizer-${index}`;
      const container = document.getElementById(containerId);
      if (container) {
        if (visualizerRefs.current[index]) {
          visualizerRefs.current[index].destroy();
          console.log(`Destroyed visualizer for slide ${index}`);
        }
        try {
          visualizerRefs.current[index] = new AudioMotionAnalyzer(container, {
            source: audio,
            mode: 7,
            gradient: "steelblue",
            ansiBands: true,
            frequencyScale: "log",
            maxFPS: 60,
            splitGradient: true,
            overlay: true,
            showBgColor: true,
            bgAlpha: 0,
          });
        } catch (error) {
          console.error("Non fatal error: Failed to create AudioMotionAnalyzer instance:", error);
        }
      }
    }
  };
  

  const setAudioRef = (el: HTMLAudioElement | null, index: number) => {
    audioRefs.current[index] = el;
  };

  const handleGuessChange = (field: "title" | "artist", value: string) => {
    setGuess((prevGuess) => ({
      ...prevGuess,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    const correctTitle = tracks[currentSlide]?.name?.toLowerCase().trim();
    const correctArtist = tracks[currentSlide]?.artist?.toLowerCase().trim();
    const userTitle = guess.title.toLowerCase().trim();
    const userArtist = guess.artist.toLowerCase().trim();

    let score = 0;

    if (userTitle === correctTitle) {
      score += 1;
    }

    if (userArtist === correctArtist) {
      score += 1;
    }

    const newScores = [...scores];
    newScores[currentSlide] = score;
    setScores(newScores);

    const newSubmittedIndices = new Set(submittedIndices);
    newSubmittedIndices.add(currentSlide);
    setSubmittedIndices(newSubmittedIndices);

    console.log(
      `Slide ${currentSlide + 1} - Titre correct: ${correctTitle}, Artiste correct: ${correctArtist}`
    );
    console.log(
      `Slide ${currentSlide + 1} - Titre soumis: ${userTitle}, Artiste soumis: ${userArtist}`
    );
    console.log(`Slide ${currentSlide + 1} - Score : ${score}`);

    if (audioTimer === null) {
      const startTime = Date.now();
      setAudioTimer(startTime);
    }

    if (audioRefs.current[currentSlide]) {
      audioRefs.current[currentSlide].pause();
    }

    if (visualizerRefs.current[currentSlide]) {
      visualizerRefs.current[currentSlide].destroy();
      visualizerRefs.current[currentSlide] = null;
      console.log(`Disconnected visualizer for slide ${currentSlide}`);
    }

    let counter = 5;
    setCountdown(counter);
    const countdownInterval = setInterval(() => {
      counter -= 1;
      setCountdown(counter);
      if (counter === 0) {
        clearInterval(countdownInterval);
        setCountdown(null);
        let nextSlide = currentSlide + 1;
        if (nextSlide < tracks.length) {
          setCurrentSlide(nextSlide);
          if (api) {
            api.scrollTo(nextSlide);
            setTimeout(() => {
              startAudio(nextSlide);
            }, 500);
          }
        }
      }
    }, 1000);
  };

  const startBlindTest = () => {
    setStarted(true);
    setModalOpen(false);
    setAudioTimer(null);
    audioRefs.current.forEach((audio) => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
    if (api) {
      api.scrollTo(0);
      setTimeout(() => {
        startAudio(0);
      }, 500);
    }
  };

  React.useEffect(() => {
    if (audioTimer !== null) {
      const elapsedTime = (Date.now() - audioTimer) / 1000;
      console.log(`Elapsed time: ${elapsedTime.toFixed(2)} seconds`);
    }
  }, [audioTimer]);

  const handleCarouselDragStart = (
    event: React.DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    console.log("Carousel drag start event prevented");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error fetching tracks:", error);
    return <div>Error fetching tracks</div>;
  }

  return (
    <div className="relative carousel-container">
      <div className="absolute inset-0 z-10 bg-transparent pointer-events-none h-[50vh]">
        <div className="absolute inset-0 pointer-events-auto"></div>
      </div>

      <div className="absolute inset-0 pointer-events-auto">
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent>
            <div className="flex flex-col items-center justify-center p-6">
              <h2 className="text-xl font-bold mb-4">Blind Test</h2>
              <p>
                Les règles du blind test sont simples: Un extrait de 30 secondes
                se lance. Il vous faudra trouver l'artiste ou le titre pour
                gagner la manche.
              </p>
              <br />
              <h2 className="text-xl font-bold">Système de points:</h2>
              <ul className="p-4">
                <li> Trouver l'artiste ou le titre vaut 1 point</li>
                <li> Trouver les deux vaut 2 points</li>
              </ul>
              <Button
                onClick={startBlindTest}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Commencer le blind test
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <div className="flex flex-col">
          <div className="relative" onDragStart={handleCarouselDragStart}>
            <Carousel
              setApi={setApi}
              className="w-full"
              draggable={false}
              opts={{
                loop: false,
              }}
            >
              <CarouselContent>
                {tracks.map((track, index) => (
                  <CarouselItem key={index} draggable={false}>
                    <Card className="rounded-[1.2rem]">
                      <CardContent className="flex flex-col items-center justify-center p-6 h-[50vh]">
                        <audio
                          ref={(el) => setAudioRef(el, index)}
                          crossOrigin="anonymous"
                        >
                          <source src={track.preview_url} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                        <div
                          id={`visualizer-${index}`}
                          className="w-full h-[100px] bg-none"
                        ></div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <form className="flex flex-col space-y-4 w-1/2">
            <div className="flex flex-col">
              <label className="mb-1 font-semibold">Titre:</label>
              <input
                type="text"
                value={guess.title}
                onChange={(e) => handleGuessChange("title", e.target.value)}
                className="p-2 border rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-semibold">Artiste:</label>
              <input
                type="text"
                value={guess.artist}
                onChange={(e) => handleGuessChange("artist", e.target.value)}
                className="p-2 border rounded-md"
              />
            </div>
            {!submittedIndices.has(currentSlide) && (
              <div className="text-center mt-4">
                <Button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleSubmit}
                >
                  Soumettre
                </Button>
              </div>
            )}
            {submittedIndices.has(currentSlide) && (
              <div className="text-center mt-4">
                <p>Votre score : {scores[currentSlide]} points</p>
                {countdown !== null && (
                  <p className="text-center">
                    Prochaine manche dans {countdown} seconde
                    {countdown !== 1 ? "s" : ""}
                  </p>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default CarouselDApiDemo;
