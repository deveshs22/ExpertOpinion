using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Data.Models.Mapping
{
    public class HospitalMap : EntityTypeConfiguration<Hospital>
    {
        public HospitalMap()
        {
            // Primary Key
            this.HasKey(t => t.HospitalId);

            // Properties
            this.Property(t => t.HospitalName)
                .HasMaxLength(200);

            this.Property(t => t.Photo)
                .HasMaxLength(200);

            this.Property(t => t.Address)
                .HasMaxLength(500);

            this.Property(t => t.Phone)
                .HasMaxLength(500);

            // Table & Column Mappings
            this.ToTable("Hospital");
            this.Property(t => t.HospitalId).HasColumnName("HospitalId");
            this.Property(t => t.HospitalName).HasColumnName("HospitalName");
            this.Property(t => t.Description).HasColumnName("Description");
            this.Property(t => t.Photo).HasColumnName("Photo");
            this.Property(t => t.Address).HasColumnName("Address");
            this.Property(t => t.Phone).HasColumnName("Phone");
            this.Property(t => t.CityId).HasColumnName("CityId");
            this.Property(t => t.StateId).HasColumnName("StateId");
            this.Property(t => t.CountryId).HasColumnName("CountryId");

            // Relationships
            this.HasOptional(t => t.City)
                .WithMany(t => t.Hospitals)
                .HasForeignKey(d => d.CityId);
            this.HasOptional(t => t.Country)
                .WithMany(t => t.Hospitals)
                .HasForeignKey(d => d.CountryId);
            this.HasOptional(t => t.State)
                .WithMany(t => t.Hospitals)
                .HasForeignKey(d => d.StateId);
        }
    }
}
