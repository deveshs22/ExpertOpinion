using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Data.Models.Mapping
{
    public class ExpertDetailMap : EntityTypeConfiguration<ExpertDetail>
    {
        public ExpertDetailMap()
        {
            // Primary Key
            this.HasKey(t => new { t.ExpertDetailId, t.UserId });

            // Properties
            this.Property(t => t.ExpertDetailId)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            this.Property(t => t.UserId)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            // Table & Column Mappings
            this.ToTable("ExpertDetail");
            this.Property(t => t.ExpertDetailId).HasColumnName("ExpertDetailId");
            this.Property(t => t.UserId).HasColumnName("UserId");

            // Relationships
            this.HasRequired(t => t.User)
                .WithMany(t => t.ExpertDetails)
                .HasForeignKey(d => d.UserId);

        }
    }
}
