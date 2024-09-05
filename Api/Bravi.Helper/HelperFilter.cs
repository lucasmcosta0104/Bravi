using Bravi.Domain.Generico.Filter;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Reflection;

namespace Bravi.Helper
{
    public static class HelperFilter<T>
    {
        public static async Task<GridFilter<T>> Filter(ModelFilter filter, IQueryable<T> query, CancellationToken cancellationToken)
        {
            if (filter == null)
            {
                throw new ArgumentNullException(nameof(filter));
            }

            // Aplicar filtros baseados em dicionário
            foreach (var campoFiltro in filter.CamposFiltro)
            {
                var property = typeof(T).GetProperty(ToPascalCase(campoFiltro.Propriedade));
                if (property != null)
                {

                    var parameter = Expression.Parameter(typeof(T), "i");
                    var propertyExpression = Expression.Property(parameter, property);

                    if (campoFiltro.Tipo == "string")
                    {
                        if (string.IsNullOrEmpty(campoFiltro.Valor))
                            continue;

                        var constant = Expression.Constant(campoFiltro.Valor);
                        var containsMethod = typeof(string).GetMethod("Contains", new[] { typeof(string) });
                        var containsExpression = Expression.Call(propertyExpression, containsMethod, constant);
                        var notContainsExpression = Expression.Not(containsExpression);
                        var lambda = Expression.Lambda<Func<T, bool>>(campoFiltro.IsIgual ? containsExpression : notContainsExpression, parameter);
                        query = query.Where(lambda);
                    }

                    if (campoFiltro.Tipo == "inteiro")
                    {
                        if (string.IsNullOrEmpty(campoFiltro.Valor))
                            continue;

                        int valor;

                        if (!int.TryParse(campoFiltro.Valor, out valor))
                        {
                            continue;
                        }

                        var constant = Expression.Constant(valor);
                        var filterExpression = campoFiltro.IsIgual ? Expression.Equal(propertyExpression, constant) : Expression.NotEqual(propertyExpression, constant);
                        var lambda = Expression.Lambda<Func<T, bool>>(filterExpression, parameter);
                        query = query.Where(lambda);
                    }

                    if (campoFiltro.Tipo == "bool")
                    {
                        if (string.IsNullOrEmpty(campoFiltro.Valor))
                            continue;

                        bool valor = campoFiltro.Valor == "Sim";

                        var constant = Expression.Constant(valor);
                        var filterExpression = campoFiltro.IsIgual ? Expression.Equal(propertyExpression, constant) : Expression.NotEqual(propertyExpression, constant);
                        var lambda = Expression.Lambda<Func<T, bool>>(filterExpression, parameter);
                        query = query.Where(lambda);
                    }


                    if (campoFiltro.Tipo == "decimal")
                    {
                        if (string.IsNullOrEmpty(campoFiltro.Valor))
                            continue;

                        decimal valor;

                        try
                        {
                            valor = Convert.ToDecimal(campoFiltro.Valor);
                        }
                        catch
                        {
                            continue;
                        }

                        var constant = Expression.Constant(valor);
                        var filterExpression = campoFiltro.IsIgual ? Expression.Equal(propertyExpression, constant) : Expression.NotEqual(propertyExpression, constant);
                        var lambda = Expression.Lambda<Func<T, bool>>(filterExpression, parameter);
                        query = query.Where(lambda);
                    }

                    if (campoFiltro.Tipo == "data")
                    {
                        if (string.IsNullOrEmpty(campoFiltro.Valor))
                            continue;

                        var datas = campoFiltro.Valor.Split(',');

                        DateTime? dataInicial = null;
                        if (!string.IsNullOrEmpty(datas[0]))
                            dataInicial = Convert.ToDateTime(datas[0]).ToUniversalTime();

                        DateTime? dataFinal = null;
                        if (!string.IsNullOrEmpty(datas[1]))
                            dataFinal = Convert.ToDateTime(datas[1]).ToUniversalTime();

                        if (dataInicial.HasValue)
                        {
                            var constantInicial = Expression.Constant(dataInicial);
                            var filterExpression = Expression.GreaterThanOrEqual(propertyExpression, constantInicial);
                            var lambda = Expression.Lambda<Func<T, bool>>(filterExpression, parameter);
                            query = query.Where(lambda);
                        }

                        if (dataFinal.HasValue)
                        {
                            var constantFinal = Expression.Constant(dataFinal.Value);
                            var filterExpression = Expression.LessThanOrEqual(propertyExpression, constantFinal);
                            var lambda = Expression.Lambda<Func<T, bool>>(filterExpression, parameter);
                            query = query.Where(lambda);
                        }
                    }


                }
            }

            // Aplicar ordenação
            if (!string.IsNullOrEmpty(filter.orderBy))
            {
                var parameter = Expression.Parameter(typeof(T), "i");
                var property = Expression.Property(parameter, filter.orderBy);
                var keySelector = Expression.Lambda(property, parameter);

                var method = filter.orderDirection.Equals("desc", StringComparison.OrdinalIgnoreCase)
                    ? "OrderByDescending"
                    : "OrderBy";

                var result = typeof(Queryable).GetMethods(BindingFlags.Static | BindingFlags.Public)
                    .First(m => m.Name == method && m.GetParameters().Length == 2)
                    .MakeGenericMethod(typeof(T), property.Type)
                    .Invoke(null, new object[] { query, keySelector });

                query = (IQueryable<T>)result;
            }

            // Calcular total de registros
            var totalRegistro = await query.CountAsync(cancellationToken);

            // Aplicar paginação
            var items = await query
                .Skip((filter.page - 1) * filter.pageSize)
                .Take(filter.pageSize)
                .ToListAsync(cancellationToken);

            return new GridFilter<T>(items ?? new List<T>(), totalRegistro);
        }

        public static string ToPascalCase(string str)
        {
            if (string.IsNullOrEmpty(str))
            {
                return str;
            }

            return char.ToUpper(str[0]) + str.Substring(1);
        }
    }
}
