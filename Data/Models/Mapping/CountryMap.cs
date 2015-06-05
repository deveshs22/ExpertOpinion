using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Data.Models.Mapping
{
    public class CountryMap : EntityTypeConfiguration<Country>
    {
        public CountryMap()
        {
            // Primary Key
            this.HasKey(t => t.CountryId);

            // Properties
            this.Property(t => t.CountryName)
                .HasMaxLength(100);

            // Table & Column Mappings
            this.ToTable("Country");
            this.Property(t => t.CountryId).HasColumnName("CountryId");
            this.Property(t => t.CountryName).HasColumnName("CountryName");
        }
    }
}
