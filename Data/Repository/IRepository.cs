using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;

namespace DataService.Repository
{
    public interface IRepository<T> where T : class
    {
        IEnumerable<T> GetAll(Func<T, bool> predicate = null);
        T Get(Func<T, bool> predicate);
        T GetWithInclude(Func<T, bool> predicate = null, params Expression<Func<T, object>>[] includes);
        IEnumerable<T> GetAllWithInclude(Func<T, bool> predicate = null, params Expression<Func<T, object>>[] includes);
        T GetById(object id);
        void Add(T entity);
        void Attach(T entity);
        void Delete(T entity);
    }
}