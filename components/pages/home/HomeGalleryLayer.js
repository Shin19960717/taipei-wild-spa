import GalleryModal from "@/components/ui/gallery/GalleryModal";
import { openLineBooking } from "@/lib/line";

export default function HomeGalleryLayer({
  gallery,
  lang,
  t,
  onCloseGallery,
  onPrevGallery,
  onNextGallery,
  onSelectGalleryImage,
}) {
  if (!gallery) return null;

  return (
    <GalleryModal
      gallery={gallery}
      lang={lang}
      t={t}
      onClose={onCloseGallery}
      onPrev={onPrevGallery}
      onNext={onNextGallery}
      onSelectImage={onSelectGalleryImage}
      openLineBooking={openLineBooking}
    />
  );
}