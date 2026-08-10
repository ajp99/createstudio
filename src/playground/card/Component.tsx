'use client';

export default function CardComponent() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Card Component</h2>
      <p className="text-slate-600">Card with hover-elevate effect.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-lg border border-slate-200 hover:shadow-lg transition-shadow">
          <h3 className="font-bold mb-2">Basic Card</h3>
          <p className="text-slate-600 text-sm">Hover to see the elevation effect.</p>
        </div>
        <div className="p-6 rounded-lg border border-slate-200 bg-gradient-to-br from-blue-50 to-transparent hover:shadow-lg transition-shadow">
          <h3 className="font-bold mb-2">Gradient Card</h3>
          <p className="text-slate-600 text-sm">With subtle background gradient.</p>
        </div>
      </div>
    </div>
  );
}
