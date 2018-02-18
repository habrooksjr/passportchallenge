using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using passportchallengeapp.Models;

namespace passportchallengeapp.DAL
{
    public class FactoryDBContext : DbContext
    {
        public FactoryDBContext() : base("FactoryDbConnString")
        {
        }

        public DbSet<Factory> Factories { get; set;  }
    }
}