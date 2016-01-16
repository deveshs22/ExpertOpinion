using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Data.Models.Mapping
{
    public class OfferTypeMap : EntityTypeConfiguration<OfferType>
    {
        public OfferTypeMap()
        {
            // Primary Key
            this.HasKey(t => t.OfferTypeId);

            // Properties
            this.Property(t => t.OfferTypeId)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.OfferTypeDesc)
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("OfferType");
            this.Property(t => t.OfferTypeId).HasColumnName("OfferTypeId");
            this.Property(t => t.OfferTypeDesc).HasColumnName("OfferTypeDesc");
        }
    }
}
