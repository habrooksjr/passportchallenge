using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace passportchallengeapp.Models
{
    public class Factory
    {
        [Key]
        public int id { get; set; }
        public string name { get; set; }
        public int? numberOfSeeds { get; set; }
        public int? seedStartRange { get; set; }
        public int? seedEndRange { get; set; }
        public string seedsList { get; set; }
    }
}