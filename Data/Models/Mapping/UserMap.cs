using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Data.Models.Mapping
{
    public class UserMap : EntityTypeConfiguration<User>
    {
        public UserMap()
        {
            // Primary Key
            this.HasKey(t => t.UserId);

            // Properties
            this.Property(t => t.Name)
                .IsRequired()
                .HasMaxLength(300);

            this.Property(t => t.Email)
                .IsRequired()
                .HasMaxLength(200);

            this.Property(t => t.Pwd)
                .IsRequired()
                .HasMaxLength(200);

            // Table & Column Mappings
            this.ToTable("User");
            this.Property(t => t.UserId).HasColumnName("UserId");
            this.Property(t => t.Name).HasColumnName("Name");
            this.Property(t => t.Email).HasColumnName("Email");
            this.Property(t => t.Pwd).HasColumnName("Pwd");
            this.Property(t => t.Active).HasColumnName("Active");
            this.Property(t => t.CreatedOn).HasColumnName("CreatedOn");
            this.Property(t => t.LastLogin).HasColumnName("LastLogin");
            this.Property(t => t.UserTypeId).HasColumnName("UserTypeId");

            // Relationships
            this.HasRequired(t => t.UserType)
                .WithMany(t => t.Users)
                .HasForeignKey(d => d.UserTypeId);

        }
    }
}
