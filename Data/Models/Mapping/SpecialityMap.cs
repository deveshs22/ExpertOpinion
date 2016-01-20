using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Data.Models.Mapping
{
    public class SpecialityMap : EntityTypeConfiguration<Speciality>
    {
        public SpecialityMap()
        {
            // Primary Key
            this.HasKey(t => t.SpecialityId);

            // Properties
            this.Property(t => t.Speciality1)
                .HasMaxLength(200);

            this.Property(t => t.SpecialityText)
                .HasMaxLength(5000);

            // Table & Column Mappings
            this.ToTable("Speciality");
            this.Property(t => t.SpecialityId).HasColumnName("SpecialityId");
            this.Property(t => t.Speciality1).HasColumnName("Speciality");
            this.Property(t => t.SpecialityText).HasColumnName("SpecialityText");
        }
    }
}
