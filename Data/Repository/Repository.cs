using Data;
using Data.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Web;

namespace DataService.Repository
{
    class Repository<T> : IRepository<T> where T : class
    {
        private ExpertOpinionDBContext entities = null;
        DbSet<T> _objectSet;

        public Repository(ExpertOpinionDBContext _entities)
        {
            entities = _entities;
            _objectSet = entities.Set<T>();
        }

        public IEnumerable<T> GetAll(Func<T, bool> predicate = null)
        {
            if (predicate != null)
            {
                return _objectSet.Where(predicate);
            }

            return _objectSet.AsEnumerable();
        }

        public T Get(Func<T, bool> predicate)
        {
            return _objectSet.FirstOrDefault(predicate);
        }

        public void Add(T entity)
        {
            _objectSet.Add(entity);
        }

        public void Attach(T entity)
        {
            _objectSet.Attach(entity);
            entities.Entry(entity).State = EntityState.Modified;
        }

        public void Delete(T entity)
        {
            _objectSet.Remove(entity);
        }
    }
}