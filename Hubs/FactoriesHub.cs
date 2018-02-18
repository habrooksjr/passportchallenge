using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using passportchallengeapp.DAL;
using passportchallengeapp.Models;
using Newtonsoft.Json;

namespace passportchallengeapp.Hubs
{
    public class FactoriesHub : Hub
    {
        FactoryDBContext dbContext = new FactoryDBContext();

        public void addFactory(string data)
        {
            var newFactory = JsonConvert.DeserializeObject<Factory>(data);

            newFactory.seedsList = getSeedList(newFactory);

            dbContext.Factories.Add(newFactory);

            dbContext.SaveChanges();

            loadFactories(newFactory.id);
        }
        public void deleteFactory(int id)
        {
            var factoryToDelete = dbContext.Factories.Where(row => row.id == id).FirstOrDefault();
            int? selectedId = 0;

            if (factoryToDelete == null)
                return;

            dbContext.Factories.Remove(factoryToDelete);

            dbContext.SaveChanges();

            selectedId = dbContext.Factories.Where(row => row.id < id).Select(row_2 => (int?)row_2.id).Max() ?? 0;
            if(selectedId == 0)
            {
                selectedId = dbContext.Factories.Where(row => row.id > id).Select(row2 => (int?)row2.id).Min() ?? 0;
            }

            loadFactories(selectedId ?? 0);
        }
        public void updateFactory(int id, string data)
        {
            var factoryToUpdate = dbContext.Factories.Where(row => row.id == id).FirstOrDefault();

            if (factoryToUpdate == null)
                return;

            var factoryData = JsonConvert.DeserializeObject<Factory>(data);
            Random rand = new Random();

            factoryToUpdate.name = factoryData.name;
            factoryToUpdate.numberOfSeeds = factoryData.numberOfSeeds;
            factoryToUpdate.seedStartRange = factoryData.seedStartRange;
            factoryToUpdate.seedEndRange = factoryData.seedEndRange;
            factoryToUpdate.seedsList = getSeedList(factoryToUpdate);

            dbContext.SaveChanges();

            loadFactories(id);
        }
        private string getSeedList(Factory factory)
        {
            Random rand = new Random();
            string list = "";

            if (factory == null)
                return "";

            for (var i = 1; i <= factory.numberOfSeeds; i++)
            {
                if (list != "")
                {
                    list += ",";
                }
                list += rand.Next(factory.seedStartRange ?? 0, (factory.seedEndRange ?? 0) + 1).ToString();
            }

            return list;
        }
        public void updateTree(int id, string data, bool callerOnly)
        {
            if (id == 0) {
                id = dbContext.Factories.Select(row => (int?)row.id).Min() ?? 0;
            }

            if(callerOnly)
            {
                Clients.Caller.updateTree(id, data);
            }
            else
            {
                Clients.All.updateTree(id, data);
            }
        }
        public void loadFactories(int selectedId, bool callerOnly = false)
        {
            List<string> seeds = null;

            var results = dbContext.Factories.ToList().Select(row => new
            {
                row.id,
                row.name,
                numberOfSeeds = row.numberOfSeeds ?? 0,
                seedStartRange = row.seedStartRange ?? 0,
                seedEndRange = row.seedEndRange ?? 0,
                seedsList = row.seedsList ?? "",
                children = new List<object>()
            }).ToList();

            if (results == null)
                return;

            foreach (var result in results)
            {
                if (result.seedsList != "")
                {
                    seeds = result.seedsList.Split(Convert.ToChar(",")).ToList();

                    foreach (string seed in seeds)
                    {
                        result.children.Add(new { id = 0, name = seed, disabled = true });
                    }
                }
            }

            var nodes = new List<object>{ new { id = 0, name = "Root", children = results, disabled = true } };

            var jsonData = JsonConvert.SerializeObject(nodes);

            updateTree(selectedId, jsonData, callerOnly);
        }
    }
}