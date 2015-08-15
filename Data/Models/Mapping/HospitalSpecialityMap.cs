using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Data.Models.Mapping
{
    public class HospitalSpecialityMap : EntityTypeConfiguration<HospitalSpeciality>
    {
        public HospitalSpecialityMap()
        {
            // Primary Key
            this.HasKey(t => t.HospitalSpecialityId);

            // Properties
            this.Property(t => t.HospitalSpeciality1)
                .HasMaxLength(500);

            // Table & Column Mappings
            this.ToTable("HospitalSpeciality");
            this.Property(t => t.HospitalSpecialityId).HasColumnName("HospitalSpecialityId");
            this.Property(t => t.HospitalSpeciality1).HasColumnName("HospitalSpeciality");
        }
    }
}
