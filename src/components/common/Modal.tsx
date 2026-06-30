'use client';

import React from 'react';
import { Button } from './Button';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children, footer }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="relative bg-white w-full max-w-lg rounded-xl shadow-xl border border-slate-200 overflow-hidden z-10 animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 max-h-[70vh] overflow-y-auto text-slate-600 leading-relaxed text-sm">
          {children}
        </div>
        {footer !== undefined ? (
          <div className="flex justify-end items-center p-4 bg-slate-50 border-t border-slate-100 space-x-3">
            {footer}
          </div>
        ) : (
          <div className="flex justify-end items-center p-4 bg-slate-50 border-t border-slate-100">
            <Button variant="secondary" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
