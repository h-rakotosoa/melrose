export const LoginHero = () => {
  return (
    <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-primary-600 to-primary-800 text-white p-12 flex-col justify-center">
      <div className="max-w-md">
        <h1 className="text-4xl font-bold mb-6">Welcome to Melrose</h1>
        <p className="text-lg text-primary-100 mb-8">
          Modern enterprise application built with scalability and best practices
          in mind.
        </p>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-white rounded-full mt-2" />
            <p className="text-primary-50">
              Enterprise-grade authentication with JWT tokens
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-white rounded-full mt-2" />
            <p className="text-primary-50">
              Mobile-first responsive design for all devices
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-white rounded-full mt-2" />
            <p className="text-primary-50">
              Modular architecture ready for micro-frontends
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
