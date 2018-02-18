using Microsoft.Owin;
using Owin;
using passportchallengeapp;

[assembly: OwinStartup(typeof(passportchallengeapp.Startup))]
namespace passportchallengeapp
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
        }
    }
}