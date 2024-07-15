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

export function CarouselDApiDemo() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [tracks, setTracks] = React.useState<TrackType[]>([]);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [guesses, setGuesses] = React.useState<Array<{ title: string; artist: string }>>(
    []
  );
  const [scores, setScores] = React.useState<Array<number | null>>([]);
  const [submittedIndices, setSubmittedIndices] = React.useState<Set<number>>(
    new Set()
  );
  const [started, setStarted] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(true);
  const [audioTimer, setAudioTimer] = React.useState<number | null>(null);
  const [countdown, setCountdown] = React.useState<number | null>(null);
  const audioRefs = React.useRef<Array<HTMLAudioElement | null>>([]);

  const { data, error, isLoading } = useGetTracks();

  React.useEffect(() => {
    if (data) {
      const initialGuesses = data.map(() => ({ title: "", artist: "" }));
      setTracks(data);
      setCount(data.length);
      setGuesses(initialGuesses);
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
      }
    }, 500);
  };

  const handleGuessChange = (
    index: number,
    field: "title" | "artist",
    value: string
  ) => {
    const newGuesses = [...guesses];
    newGuesses[index][field] = value;
    setGuesses(newGuesses);
  };

  const handleSubmit = (index: number) => () => {
    const correctTitle = tracks[index]?.name?.toLowerCase().trim();
    const correctArtist = tracks[index]?.artist?.toLowerCase().trim();    
    const userTitle = guesses[index].title.toLowerCase().trim();
    const userArtist = guesses[index].artist.toLowerCase().trim();

    let score = 0;

    if (userTitle === correctTitle) {
      score += 1;
    }

    if (userArtist === correctArtist) {
      score += 1;
    }

    const newScores = [...scores];
    newScores[index] = score;
    setScores(newScores);

    const newSubmittedIndices = new Set(submittedIndices);
    newSubmittedIndices.add(index);
    setSubmittedIndices(newSubmittedIndices);

    console.log(
      `Slide ${index + 1} - Titre correct: ${correctTitle}, Artiste correct: ${correctArtist}`
    );
    console.log(
      `Slide ${index + 1} - Titre soumis: ${userTitle}, Artiste soumis: ${userArtist}`
    );
    console.log(`Slide ${index + 1} - Score : ${score}`);

    if (audioTimer === null) {
      const startTime = Date.now();
      setAudioTimer(startTime);
    }

    if (audioRefs.current[index]) {
      audioRefs.current[index].pause();
    }

    let counter = 5;
    setCountdown(counter);
    const countdownInterval = setInterval(() => {
      counter -= 1;
      setCountdown(counter);
      if (counter === 0) {
        clearInterval(countdownInterval);
        setCountdown(null);
        let nextSlide = index + 1;
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

  const handleCarouselDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error fetching tracks:", error);
    return <div>Error fetching tracks</div>;
  }

  return (
    <div className="relative">
      <div className="absolute inset-0 z-10 bg-transparent pointer-events-none">
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
        <div className="relative" onDragStart={handleCarouselDragStart}>
          <Carousel
            setApi={setApi}
            className="w-full"
            draggable={false}
            opts={{
              loop: false,
              speed: 10,
            }}
          >
            <CarouselContent>
              {tracks.map((track, index) => (
                <CarouselItem key={index} draggable={false}>
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <audio ref={(el) => (audioRefs.current[index] = el)}>
                        <source src={track.preview_url} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                      <form className="flex flex-col space-y-4 mt-4 relative z-20">
                        <div className="flex flex-col">
                          <label className="mb-1 font-semibold">Titre:</label>
                          <input
                            type="text"
                            value={guesses[index].title}
                            onChange={(e) =>
                              handleGuessChange(index, "title", e.target.value)
                            }
                            className="p-2 border rounded-md"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label className="mb-1 font-semibold">Artiste:</label>
                          <input
                            type="text"
                            value={guesses[index].artist}
                            onChange={(e) =>
                              handleGuessChange(index, "artist", e.target.value)
                            }
                            className="p-2 border rounded-md"
                          />
                        </div>
                      </form>
                      {!submittedIndices.has(index) && (
                        <div className="text-center mt-4 relative z-20">
                          <Button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={handleSubmit(index)}
                          >
                            Soumettre
                          </Button>
                        </div>
                      )}
                      {submittedIndices.has(index) && (
                        <div className="text-center mt-4 relative z-20">
                          <p>Votre score : {scores[index]} points</p>
                          {countdown !== null && (
                            <p className="text-center">
                              Prochaine manche dans {countdown} seconde
                              {countdown !== 1 ? "s" : ""}
                            </p>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
      {started && (
        <div className="py-2 text-center text-sm text-muted-foreground">
          Slide {currentSlide + 1} of {count}
          Score:{" "}
          {scores
            .filter((score) => score !== null)
            .reduce((acc, score) => acc + score, 0)}{" "}
          points
        </div>
      )}
    </div>
  );
}
