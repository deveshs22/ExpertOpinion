using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Data.Models.Mapping
{
    public class OfferMap : EntityTypeConfiguration<Offer>
    {
        public OfferMap()
        {
            // Primary Key
            this.HasKey(t => t.OfferId);

            // Properties
            this.Property(t => t.OfferId)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.OfferCode)
                .HasMaxLength(20);

            this.Property(t => t.OfferCode)
                .HasMaxLength(1000);

            // Table & Column Mappings
            this.ToTable("Offers");
            this.Property(t => t.OfferId).HasColumnName("OfferId");
            this.Property(t => t.OfferCode).HasColumnName("OfferCode");
            this.Property(t => t.OfferDescription).HasColumnName("OfferDescription");
            this.Property(t => t.ValidFrom).HasColumnName("ValidFrom");
            this.Property(t => t.ValidTo).HasColumnName("ValidTo");
            this.Property(t => t.IsActive).HasColumnName("IsActive");
            this.Property(t => t.OfferTypeId).HasColumnName("OfferTypeId");
            this.Property(t => t.OfferValue).HasColumnName("OfferValue");
            this.Property(t => t.UserId).HasColumnName("UserId");
            this.Property(t => t.MaxUseTime).HasColumnName("MaxUseTime");

            // Relationships
            this.HasOptional(t => t.User)
                .WithMany(t => t.Offers)
                .HasForeignKey(d => d.UserId);

            // Relationships
            this.HasRequired(t => t.OfferType)
                .WithMany(t => t.Offers)
                .HasForeignKey(d => d.OfferTypeId);

        }
    }
}
