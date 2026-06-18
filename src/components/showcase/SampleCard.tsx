import Link from 'next/link';
import Image from 'next/image';
import { SampleMeta } from '@/lib/samplesRegistry';

interface Props {
  meta: SampleMeta;
}

export default function SampleCard({ meta }: Props) {
  return (
    <Link href={`/samples/${meta.slug}`}>
      <div className="group cursor-pointer h-full flex flex-col rounded-xl overflow-hidden border border-white/10 bg-white/5 transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:scale-105">
        <div className="relative w-full aspect-video bg-white/5 overflow-hidden">
          <Image
            src={meta.thumbnail}
            alt={meta.title}
            fill
            loading="eager"
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-2">{meta.title}</h3>
            <p className="text-sm text-white/70 mb-4 line-clamp-2">{meta.description}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {meta.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-white/10 text-white/80 border border-white/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
