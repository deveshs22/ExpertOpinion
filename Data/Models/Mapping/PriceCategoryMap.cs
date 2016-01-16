using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Data.Models.Mapping
{
    public class PriceCategoryMap : EntityTypeConfiguration<PriceCategory>
    {
        public PriceCategoryMap()
        {
            // Primary Key
            this.HasKey(t => t.PriceCategoryId);

            // Properties
            this.Property(t => t.Description)
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("PriceCategory");
            this.Property(t => t.PriceCategoryId).HasColumnName("PriceCategoryId");
            this.Property(t => t.Description).HasColumnName("Description");
            this.Property(t => t.Price).HasColumnName("Price");
        }
    }
}
