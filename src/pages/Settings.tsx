export default function Settings() {
  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto">
      <h1 className="display text-3xl md:text-4xl font-bold">Settings</h1>
      <p className="text-muted-foreground mt-1">Personalize your RESUMA studio.</p>
      <div className="mt-6 glass rounded-2xl p-5 text-sm text-muted-foreground">
        Toggle the theme using the sun/moon icon in the header. More settings coming soon — auto-tailoring rules, default font pairings and export presets.
      </div>
    </div>
  );
}
