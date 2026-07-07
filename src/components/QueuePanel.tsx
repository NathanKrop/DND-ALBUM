"use client";

import { useState } from "react";
import { usePlayer } from "@/context/PlayerContext";
import { RiCloseLine, RiPlayFill, RiDeleteBinLine } from "react-icons/ri";

export default function QueuePanel() {
  const { queue, track, play, clearQueue, album, removeFromQueue, moveInQueue } = usePlayer();
  const [open, setOpen] = useState(false);

  return (
    <div className={`fixed right-4 bottom-24 z-50 max-w-xs w-full ${open ? '' : ''}`}>
      <button
        className="mb-2 w-12 h-12 rounded-full bg-gold flex items-center justify-center text-bg shadow-lg"
        onClick={() => setOpen((s) => !s)}
        aria-label="Toggle queue"
      >
        {open ? <RiCloseLine /> : <RiPlayFill />}
      </button>

      {open && (
        <div className="bg-navy/95 border border-white/5 rounded-lg p-3 backdrop-blur-md">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-heading font-semibold">Up Next</h4>
            <button onClick={() => clearQueue()} className="text-muted hover:text-gold">
              <RiDeleteBinLine />
            </button>
          </div>
          <div className="max-h-64 overflow-auto">
            {queue.length === 0 && <p className="text-xs text-muted">Queue is empty</p>}
            {queue.map((t, idx) => (
              <div key={t.id} className="flex items-center justify-between gap-3 py-2">
                <div>
                  <p className={`text-sm truncate ${track?.id === t.id ? 'text-gold' : 'text-cream'}`}>{t.title}</p>
                  <p className="text-xs text-muted">{t.duration}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => play(t, album!)} className="text-cream hover:text-gold" title="Play">
                    <RiPlayFill />
                  </button>
                  <button onClick={() => moveInQueue(idx, Math.max(0, idx - 1))} className="text-muted hover:text-gold" title="Move up">▲</button>
                  <button onClick={() => moveInQueue(idx, Math.min(queue.length - 1, idx + 1))} className="text-muted hover:text-gold" title="Move down">▼</button>
                  <button onClick={() => removeFromQueue(t.id)} className="text-muted hover:text-red-400" title="Remove">✕</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
