using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using API.Entities;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using API.Interfaces;
using API.DTOs;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using API.Extensions;
using API.Helpers;

namespace API.Controllers
{
  [Authorize]
  public class UsersController : BaseApiController
  {
    // private readonly ILogger<WeatherForecastController> _logger;

    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;
    private readonly IPhotoService _photoService;

    public UsersController(IUserRepository userRepository, IMapper mapper, 
                           IPhotoService photoService)
    {
      _mapper = mapper;
      _photoService = photoService;
      _userRepository = userRepository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers([FromQuery] UserParams userParams)
    {
      var users = await _userRepository.GetMemberAsync(userParams);

      Response.AddPaginationHeader(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);
      return Ok(users);
    }


    [HttpGet("{username}", Name="GetUser")]
    public async Task<ActionResult<MemberDto>> GetUser(string username)
    {
      return await _userRepository.GetMemberAsync(username);
    }

    [HttpPut]
    public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto){

      var username = User.GetUserName();
      var user = await _userRepository.GetUserByUsernameAsync(username);

      _mapper.Map(memberUpdateDto, user);

      _userRepository.Update(user);

      if (await _userRepository.SaveAllAsync())
          return NoContent();
        
      return BadRequest("");
    }

    [HttpPost("add-photo")]
    public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file)
    {
      var user = await _userRepository.GetUserByUsernameAsync(User.GetUserName());

      var result = await _photoService.AddPhotoAsync(file);

      if (result.Error != null) return BadRequest(result.Error.Message);

      var photo = new Photo 
      {
        Url = result.SecureUrl.AbsoluteUri,
        PublicId = result.PublicId
      };

      if( user.Photos.Count == 0)
      {
        photo.IsMain = true;
      }

      user.Photos.Add(photo);

      if (await _userRepository.SaveAllAsync())
      {
        return CreatedAtRoute("GetUser",new { username = user.UserName },  _mapper.Map<PhotoDto>(photo));
      }
        

      return BadRequest("Problem adding photo");
    }
  

    [HttpPut("set-main-photo/{photoId}")]
    public async Task<ActionResult> SetMainPhoto(int photoId)
    {
      var user = await _userRepository.GetUserByUsernameAsync(User.GetUserName());
      var photo = user.Photos.FirstOrDefault(x => x.Id == photoId);


      if (photo.IsMain) return BadRequest("This is already your main photo");

      var currentMain = user.Photos.FirstOrDefault(x => x.IsMain);

      if (currentMain != null) currentMain.IsMain = false;
      photo.IsMain = true;

      if (await _userRepository.SaveAllAsync()) return NoContent();

      return BadRequest("Failed to set main photo");
    }

    [HttpDelete("delete-photo/{photoId}")]
    public async Task<ActionResult> DeletePhoto(int photoId)
    {
      var user = await _userRepository.GetUserByUsernameAsync(User.GetUserName());
      var photo = user.Photos.FirstOrDefault(x => x.Id == photoId);

      if (photo == null) return NotFound();

      if (photo.IsMain) return BadRequest("You cannot delete your main photo");

      if (photo.PublicId != null)
      {
        var result = await _photoService.DeletePhotoAsync(photo.PublicId);
        if (result.Error != null) return BadRequest(result.Error.Message);
      }

      user.Photos.Remove(photo);

      if (await _userRepository.SaveAllAsync()) return Ok();

      return BadRequest("Failed to delete your photo");
    }
  
  }
}