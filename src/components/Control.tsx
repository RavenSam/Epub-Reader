import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useStore } from "../store";

export const Control = () => {
  const { book } = useStore();

  if (!book) return null;

  const onPrev = () => book?.rendition.prev();
  const onNext = () => book?.rendition.next();

  return (
    <div className="">
      <Button
        variant="ghost"
        className="absolute left-0 top-1/2 transform -translate-y-1/2"
        onClick={onPrev}
        aria-label="Previous"
      >
        <ArrowLeft />
      </Button>
      <Button
        variant="ghost"
        className="absolute right-2 top-1/2 transform -translate-y-1/2"
        onClick={onNext}
        aria-label="Next"
      >
        <ArrowRight />
      </Button>
    </div>
  );
};
