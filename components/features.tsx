import { 
  ShieldCheck, 
  KeyRound, 
  HeartPulse, 
  Sliders, 
  Users, 
  Lock, 
  Coins, 
  FileText, 
  Server,
  Layers,
  Clock,
  BellRing
} from "lucide-react";

export function Features() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28 border-t border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Arxitektura & İş Prinsipi
          </h2>
          <p className="mt-3 text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
            Sıfır-Kompromis Təhlükəsizlik Sistemi
          </p>
          <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
            Ailənizin ən həssas məlumatlarını qorumaq üçün hər bir detal kriptoqrafik riyaziyyat üzərində qurulub.
          </p>
        </div>

        {/* 3 Core Architecture Pillars */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <div className="relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-6">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              1. Zero-Knowledge & Shamir SSS
            </h3>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Məlumatlar brauzerinizdə AES-256-GCM ilə şifrələnir. Əsas bərpa açarı isə <strong>Shamir's Secret Sharing (2-of-3)</strong> riyazi alqoritmi ilə hissələrə bölünür. Tək bir şəxs və ya hətta biz belə seyfi təkbaşına aça bilmərik.
            </p>
            <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center gap-2 text-xs font-mono text-zinc-500">
              <KeyRound className="w-4 h-4 text-emerald-500" />
              <span>Lagrange Interpolation GF(256)</span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 mb-6">
              <HeartPulse className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              2. Pilləli "Dead Man's Switch"
            </h3>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              İstifadəçi hər 30/60/90 gündən bir tək toxunuşla "Mən sağam" təsdiqi verir. Cavab gecikərsə, sistem pilləli rejimə keçir: 
              1-ci həftə E-poçt/SMS, 2-ci həftə təcili push, 3-cü həftə əsas qəyyumun yoxlaması.
            </p>
            <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center gap-2 text-xs font-mono text-zinc-500">
              <BellRing className="w-4 h-4 text-cyan-500" />
              <span>4-Pilləli Təhlükəsizlik Eskalasiyası</span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 mb-6">
              <Sliders className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              3. Modul Üzrə Qranulyar Giriş
            </h3>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Hər ailə üzvü hər şeyi görməməlidir: Maliyyə seyfi (banklar və kripto) həyat yoldaşına, Şəxsi xatirələr uşaqlara, Biznes və IT server şifrələri isə şirkət ortaqlarına fərdi şəkildə ötürülür.
            </p>
            <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center gap-2 text-xs font-mono text-zinc-500">
              <Layers className="w-4 h-4 text-purple-500" />
              <span>Fərdi İcazə Matrisi</span>
            </div>
          </div>
        </div>

        {/* The 3 Dedicated Vault Modules Showcase */}
        <div id="security" className="mt-20 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-900 text-white p-8 sm:p-12">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Üç Müstəqil Təhlükəsizlik Seyfi
            </span>
            <h3 className="mt-2 text-2xl sm:text-3xl font-bold">
              Hər Ehtiyac Üçün Ayrılmış Şifrəli Bölmələr
            </h3>
            <p className="mt-3 text-sm text-zinc-400">
              Məlumatlar vahid yerdə qatışmır — hər bölmə öz təyinatına və təyin edilmiş qəyyumuna uyğun idarə edilir.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-zinc-950/80 border border-zinc-800 p-6">
              <div className="h-10 w-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                <Coins className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-lg text-zinc-100">Maliyyə & Kripto Seyfi</h4>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                Bank hesabları, investisiyalar, sığorta müqavilələri və Ledger/Trezor soyuq cüzdanların 24 sözlük seed frazaları.
              </p>
            </div>

            <div className="rounded-2xl bg-zinc-950/80 border border-zinc-800 p-6">
              <div className="h-10 w-10 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-lg text-zinc-100">Rəqəmsal İrs & Xatirələr</h4>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                Ailənizə vida məktubları, şəxsi video müraciətlər, bulud foto arxivləri və hüquqi vəsiyyət qeydləri.
              </p>
            </div>

            <div className="rounded-2xl bg-zinc-950/80 border border-zinc-800 p-6">
              <div className="h-10 w-10 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4">
                <Server className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-lg text-zinc-100">Biznes & IT İnfrastruktur</h4>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                Domen qeydiyyatçıları (Cloudflare/Namecheap), AWS root açarları, 2FA ehtiyat kodları və şirkət admin panelləri.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
